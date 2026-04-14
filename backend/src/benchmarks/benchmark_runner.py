# Benchmarking
# This script should:
# Collect data for Classical ECDH
# Collect data for Post-Quantum MLLEM (Kyber)
# Collect data for Hybrid protocol
# Store collected data as CSV (backup)
# Store collected data as JSON

import time, json, csv, os
from datetime import datetime
from backend.src.benchmarks.ecdh_x25519 import generate_keypair as ecdh_keygen, derive_shared_secret, hkdf_derive
from backend.src.benchmarks.kyber_kem import generate_keypair as kyber_keygen, encapsulate, decapsulate
from backend.src.handshake.alice_client import Alice
from backend.src.handshake.bob_server import Bob
from backend.src.benchmarks.hybrid_kdf import derive_hybrid_key

# python -m backend.src.benchmarks.benchmark_runner TO RUN

def benchmark_ecdh_operations():
    try:
        start_total = time.perf_counter()

        # Key generation
        start = time.perf_counter()
        alice_priv, alice_pub = ecdh_keygen()
        bob_priv, bob_pub = ecdh_keygen()
        keygen_time = time.perf_counter() - start

        print("Alice pub len:", len(alice_pub))
        print("Bob pub len:", len(bob_pub))

        # Shared secret derivation
        start = time.perf_counter()
        alice_shared = derive_shared_secret(alice_priv, bob_pub)
        bob_shared = derive_shared_secret(bob_priv, alice_pub)
        derive_time = time.perf_counter() - start

        # HKDF 
        start = time.perf_counter()
        alice_final = hkdf_derive(alice_shared)
        bob_final = hkdf_derive(bob_shared)
        kdf_time = time.perf_counter() - start

        total_time = time.perf_counter() - start_total
        success = alice_final == bob_final

        return {
            "success": success,
            "keygen_time": keygen_time,
            "derive_time": derive_time,
            "kdf_time": kdf_time,
            "total_time": total_time,
            "key_size": len(alice_final),
            "error": None
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def benchmark_kyber_operations():
    try:
        start_total = time.perf_counter()

        # Key generation
        start = time.perf_counter()
        public_key, secret_key = kyber_keygen()
        keygen_time = time.perf_counter() - start

        # Encapsulation
        start = time.perf_counter()
        ciphertext, sender_secret = encapsulate(public_key)
        encap_time = time.perf_counter() - start

        # Decapsulation
        start = time.perf_counter()
        receiver_secret = decapsulate(ciphertext, secret_key)
        decap_time = time.perf_counter() - start

        total_time = time.perf_counter() - start_total
        success = sender_secret == receiver_secret

        return {
            "success": success,
            "keygen_time": keygen_time,
            "encap_time": encap_time,
            "decap_time": decap_time,
            "total_time": total_time,
            "key_size": len(sender_secret),
            "error": None
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    
# def benchmark_hybrid_protocol():
#     try:
#         start_total = time.perf_counter()

#         # Key generation (both parties)
#         start = time.perf_counter()
#         alice = Alice()
#         bob = Bob()
#         keygen_time = time.perf_counter() - start

#         # Exchange public keys
#         bob_ecdh_pub, bob_kyber_pub = bob.get_public_keys()

#         # Alice computes secrets + encapsulates
#         start = time.perf_counter()
#         alice_data = alice.generate_secrets(bob_ecdh_pub, bob_kyber_pub)
#         encap_time = time.perf_counter() - start

#         # Bob decapsulates + derives
#         start = time.perf_counter()
#         bob_data = bob.compute_secrets(
#             alice.ecdh_public,
#             alice_data["ciphertext"]
#         )

#         decap_time = time.perf_counter() - start

#         # HKDF Hybrid
#         start = time.perf_counter()
#         alice_final = derive_hybrid_key(
#             alice_data["ecdh_secret"],
#             alice_data["kyber_secret"]
#         )
#         bob_final = derive_hybrid_key(
#             bob_data["ecdh_secret"],
#             bob_data["kyber_secret"]
#         )
#         kdf_time = time.perf_counter() - start

#         total_time = time.perf_counter() - start_total
#         success = alice_final == bob_final

#         return {
#             "success": success,
#             "keygen_time": keygen_time,
#             "encap_time": encap_time,
#             "decap_time": decap_time,
#             "kdf_time": kdf_time,
#             "total_time": total_time,
#             "final_key_size": len(alice_final),
#             "error": None
#         }

#     except Exception as e:
#         return {
#             "success": False,
#             "error": str(e)
#         }
    
def benchmark_hybrid_protocol():
    try:
        total_start = time.perf_counter()

        # Step timings
        step_times = {}

        # Init
        start = time.perf_counter()
        alice = Alice()
        bob = Bob()
        step_times["initialisation"] = time.perf_counter() - start

        # Key exchange
        # start = time.perf_counter()
        bob_ecdh_pub, bob_kyber_pub = bob.get_public_keys()
        # alice_result = alice.generate_secrets(bob_ecdh_pub, bob_kyber_pub)
        # bob_result = bob.compute_secrets(alice.ecdh_public, alice_result["ciphertext"])
        # step_times["exchange"] = time.perf_counter() - start

        # Alice encapsulation
        start = time.perf_counter()
        alice_result = alice.generate_secrets(bob_ecdh_pub, bob_kyber_pub)
        encap_time = time.perf_counter() - start

        # Bob decapsulation
        start = time.perf_counter()
        bob_result = bob.compute_secrets(
            alice.ecdh_public,
            alice_result["ciphertext"]
        )
        decap_time = time.perf_counter() - start

        # STEP 5: Validate secrets match
        alice_ecdh_secret = alice_result["ecdh_secret"]
        alice_kyber_secret = alice_result["kyber_secret"]
        bob_ecdh_secret = bob_result["ecdh_secret"]
        bob_kyber_secret = bob_result["kyber_secret"]
        ecdh_match = alice_ecdh_secret == bob_ecdh_secret
        kyber_match = alice_kyber_secret == bob_kyber_secret

        # HKDF
        start = time.perf_counter()
        alice_final = derive_hybrid_key(
            alice_result["ecdh_secret"],
            alice_result["kyber_secret"]
        )
        bob_final = derive_hybrid_key(
            bob_result["ecdh_secret"],
            bob_result["kyber_secret"]
        )
        step_times["hkdf"] = time.perf_counter() - start

        total_time = time.perf_counter() - total_start

        # Success determined if BOTH secrets and final key match
        success = (ecdh_match and kyber_match and (alice_final == bob_final))

        # return {
        #     "success": success,
        #     "ecdh_secrets_match": ecdh_match,
        #     "kyber_secrets_match": kyber_match,
        #     "total_time": total_time,
        #     "step_times": step_times,
        #     "key_size": len(alice_final),
        #     "error": None if success else "Final keys do not match"
        # }
    
        return {
        "success": success,
        "ecdh_match": ecdh_match,
        "kyber_match": kyber_match,
        "keygen_time": step_times["initialisation"],
        "encap_time": encap_time,
        "decap_time": decap_time,
        "kdf_time": step_times["hkdf"],
        "total_time": total_time,
        "key_size": len(alice_final),
        "error": None if success else "Final keys do not match"
    }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def summarise(results):
    total = len(results)
    successes = sum(1 for r in results if r["success"])

    # def avg(field):
    #     return sum(r.get(field, 0) for r in results) / total

    def avg(field):
        valid = [r[field] for r in results if r.get("success") and field in r]
        return sum(valid) / len(valid) if valid else None

    return {
        "runs": total,
        "success_rate": successes / total,
        "avg_keygen_time": avg("keygen_time"),
        "avg_encap_time": avg("encap_time"),
        "avg_decap_time": avg("decap_time"),
        "avg_derive_time": avg("derive_time"),
        "avg_kdf_time": avg("kdf_time"),
        "avg_total_time": avg("total_time")
    }

def run_benchmark(func, iterations=50, name=""):
    print(f"\n--- Running {name} ({iterations} iterations) ---")

    results = []

    for i in range(iterations):
        print(f"{name} iteration {i+1}/{iterations}")
        result = func()
        #result["ID"] = i + 1
        result = {
            "ID": i + 1,
            "protocol": name,
            **result
        }

        print("Result:", result, "\n")
        results.append(result)

    return results


def export_to_csv(filepath, data):
    if not data:
        return

    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    keys = data[0].keys()

    with open(filepath, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)

    print(f"Saved CSV -> {filepath}")


def run_all_benchmarks(iterations=50):
    print("\n========== RUNNING BENCHMARKS ==========")

    # Run benchmarks
    ecdh = run_benchmark(benchmark_ecdh_operations, iterations, "ECDH")
    kyber = run_benchmark(benchmark_kyber_operations, iterations, "KYBER")
    hybrid = run_benchmark(benchmark_hybrid_protocol, iterations, "HYBRID")

    # Summaries
    output = {
        "timestamp": str(datetime.now()),
        "iterations": iterations,
        "ecdh": {
            "summary": summarise(ecdh),
            "results": ecdh
        },
        "kyber": {
            "summary": summarise(kyber),
            "results": kyber
        },
        "hybrid": {
            "summary": summarise(hybrid),
            "results": hybrid
        }
    }

    # Save JSON
    with open("data/benchmark_results.json", "w") as f:
        json.dump(output, f, indent=4)

    print("Results saved to benchmark_results.json")

    # Save CSV
    export_to_csv("data/ecdh_results.csv", ecdh)
    export_to_csv("data/kyber_results.csv", kyber)
    export_to_csv("data/hybrid_results.csv", hybrid)

    return output

# ENTRY POINT
if __name__ == "__main__":
    print("Starting benchmark runner...\n")
    #TO DO: VALUE CHECKING - NO NEGATIVES ETC 
    count = int(input("State number of iterations for benchmarking: "))
    results = run_all_benchmarks(iterations=count)
    #results = run_all_benchmarks(iterations=5)

    print("\n========== SUMMARY ==========")
    print(json.dumps({
        "ecdh": results["ecdh"]["summary"],
        "kyber": results["kyber"]["summary"],
        "hybrid": results["hybrid"]["summary"]
    }, indent=4))