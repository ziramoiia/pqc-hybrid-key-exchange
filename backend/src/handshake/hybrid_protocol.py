from backend.src.handshake.alice_client import Alice
from backend.src.handshake.bob_server import Bob
from backend.src.benchmarks.hybrid_kdf import derive_hybrid_key

def run_hybrid_protocol():
    try:
        print("\n========== HYBRID HANDSHAKE START ==========")
        # STEP 1: Initialise Alice and Bob
        print("\n--- [STEP 1] Initialising Alice and Bob ---")
        alice = Alice()
        bob = Bob()

        # STEP 2: Bob shares public keys
        print("\n--- [STEP 2] Bob shares public keys ---")
        bob_ecdh_pub, bob_kyber_pub = bob.get_public_keys()

        print("Bob ECDH public key length:", len(bob_ecdh_pub))
        print("Bob Kyber public key length:", len(bob_kyber_pub))

        # STEP 3: Alice generates secrets
        print("\n--- [STEP 3] Alice generates secrets ---")
        alice_result = alice.generate_secrets(bob_ecdh_pub, bob_kyber_pub)

        alice_ecdh_secret = alice_result["ecdh_secret"]
        alice_kyber_secret = alice_result["kyber_secret"]
        ciphertext = alice_result["ciphertext"]

        print("Alice ECDH secret:", alice_ecdh_secret.hex())
        print("Alice Kyber secret:", alice_kyber_secret.hex())

        # STEP 4: Bob computes secrets
        print("\n--- [STEP 4] Bob computes secrets ---")
        bob_result = bob.compute_secrets(alice.ecdh_public, ciphertext)

        bob_ecdh_secret = bob_result["ecdh_secret"]
        bob_kyber_secret = bob_result["kyber_secret"]

        print("Bob ECDH secret:", bob_ecdh_secret.hex())
        print("Bob Kyber secret:", bob_kyber_secret.hex())

        # STEP 5: Validate secrets match
        print("\n--- [STEP 5] Validating shared secrets ---")

        ecdh_match = alice_ecdh_secret == bob_ecdh_secret
        kyber_match = alice_kyber_secret == bob_kyber_secret

        print("ECDH match:", ecdh_match)
        print("Kyber match:", kyber_match)

        if not (ecdh_match and kyber_match):
            return {
                "success": False,
                "error": "Shared secrets do not match"
            }

        # STEP 6: Derive hybrid key (HKDF)
        print("\n--- [STEP 6] Deriving hybrid key ---")

        alice_final = derive_hybrid_key(alice_ecdh_secret, alice_kyber_secret)
        bob_final = derive_hybrid_key(bob_ecdh_secret, bob_kyber_secret)

        print("Alice final key:", alice_final.hex())
        print("Bob final key:", bob_final.hex())

        # STEP 7: Final validation
        print("\n--- [STEP 7] Final key validation ---")

        success = alice_final == bob_final

        print("Final keys match:", success)
        print("\n========== HYBRID HANDSHAKE COMPLETE ==========")

        return {
            "success": success,
            "shared_key": alice_final.hex(), # For API Fetch request data must be formatted as JSON does not support bytes
            "ecdh_key_size": len(alice_ecdh_secret),
            "kyber_key_size": len(alice_kyber_secret),
            "final_key_size": len(alice_final),
            "error": None if success else "Final keys do not match"
        }

    except Exception as e:
        print("\n[EXCEPTION OCCURRED]")
        print(str(e))

        return {
            "success": False,
            "error": str(e)
        }