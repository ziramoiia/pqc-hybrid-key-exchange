import hashlib
import hmac

from backend.src.benchmarks.ecdh_x25519 import run_ecdh_handshake
from backend.src.benchmarks.kyber_kem import run_kyber_kem


def hkdf_extract(salt: bytes, input_key_material: bytes) -> bytes:
    print("\n[HKDF-EXTRACT]")
    print("Salt:", salt)
    print("IKM length:", len(input_key_material))
    print("IKM (hex):", input_key_material.hex())

    prk = hmac.new(salt, input_key_material, hashlib.sha256).digest()

    print("PRK (hex):", prk.hex())
    return prk


def hkdf_expand(prk: bytes, info: bytes, length: int = 32) -> bytes:
    print("\n[HKDF-EXPAND]")
    print("PRK:", prk.hex())
    print("Info:", info)
    print("Desired length:", length)

    output = b""
    previous_block = b""
    counter = 1

    while len(output) < length:
        data = previous_block + info + bytes([counter])
        print(f"\nBlock {counter}")
        print("Data:", data.hex())

        current_block = hmac.new(prk, data, hashlib.sha256).digest()
        print("Block output:", current_block.hex())

        output += current_block
        previous_block = current_block
        counter += 1

    final_output = output[:length]
    print("\nFinal OKM:", final_output.hex())

    return final_output


def derive_hybrid_key(ecdh_key: bytes, kyber_key: bytes) -> bytes:
    print("\n[HYBRID KEY DERIVATION]")

    print("ECDH shared key length:", len(ecdh_key))
    print("ECDH shared key:", ecdh_key.hex())

    print("Kyber shared key length:", len(kyber_key))
    print("Kyber shared key:", kyber_key.hex())

    # Combine secrets
    ikm = ecdh_key + kyber_key
    print("\nCombined IKM length:", len(ikm))
    print("Combined IKM:", ikm.hex())

    salt = b"hybrid-handshake-salt"
    info = b"hybrid key agreement"

    print("\nSalt:", salt)
    print("Info:", info)

    prk = hkdf_extract(salt, ikm)
    final_key = hkdf_expand(prk, info, length=32)

    print("\n[FINAL DERIVED KEY]")
    print("Final key:", final_key.hex())

    return final_key


def run_hybrid_handshake():
    try:
        print("\n========== HYBRID HANDSHAKE START ==========")

        # 1. ECDH
        print("\n--- Running ECDH ---")
        ecdh_result = run_ecdh_handshake()

        print("ECDH Result:", ecdh_result)

        if not ecdh_result["success"]:
            return {
                "success": False,
                "error": "ECDH failed"
            }

        # 2. Kyber
        print("\n--- Running Kyber (ML-KEM) ---")
        kyber_result = run_kyber_kem()

        print("Kyber Result:", kyber_result)

        if not kyber_result["success"]:
            return {
                "success": False,
                "error": "Kyber failed"
            }

        # 3. Extract secrets
        ecdh_shared = ecdh_result["shared_key"]
        kyber_shared = kyber_result["shared_key"]

        print("\n--- Shared Secrets ---")
        print("ECDH shared:", ecdh_shared.hex())
        print("Kyber shared:", kyber_shared.hex())

        # 4. Derive final key
        final_key = derive_hybrid_key(ecdh_shared, kyber_shared)

        print("\n========== HYBRID HANDSHAKE COMPLETE ==========")

        return {
            "success": True,
            "shared_key": final_key,
            "ecdh_key_size": len(ecdh_shared),
            "kyber_key_size": len(kyber_shared),
            "final_key_size": len(final_key),
            "error": None
        }

    except Exception as e:
        print("\n[ERROR OCCURRED]")
        print(str(e))

        return {
            "success": False,
            "error": str(e)
        }