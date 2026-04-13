#post-quantum KEM 
# This script should:
# Generate a key pair
# Compute a shared secret
# Provide a helper that runs a full handshake between two parties for benchmarking

import oqs # ib-oqs-python is a python wrapper for  a c library
import time # for benchmarking helper

def generate_keypair():
    kem = oqs.KeyEncapsulation("ML-KEM-512") # holds internal state
    public_key = kem.generate_keypair() # shared with sender
    secret_key = kem.export_secret_key() #kept private
    return public_key, secret_key

def encapsulate(public_key):
    with oqs.KeyEncapsulation("ML-KEM-512") as kem:
        ciphertext, shared_secret = kem.encap_secret(public_key)
    return ciphertext, shared_secret

def decapsulate(ciphertext, secret_key):
    with oqs.KeyEncapsulation("ML-KEM-512", secret_key) as kem:
        shared_secret = kem.decap_secret(ciphertext)
    return shared_secret

def run_kyber_kem():
    try:
        # Bob generated keys
        print("Generating ML-KEM keypair...")
        public_key, secret_key = generate_keypair()
        # Alice encapsulates
        print("Encapsulating...")
        ciphertext, sender_secret = encapsulate(public_key)
        # Bob decapsulates
        print("Decapsulating...")
        receiver_secret = decapsulate(ciphertext, secret_key)
        # Validate success
        print("Generation complete...")
        success = sender_secret == receiver_secret

        return {
            "success": success,
            "shared_key": sender_secret,
            "key_size": len(sender_secret),
            "error": None
        }
    
    except Exception as e:

        return {
            "success": False, 
            "key_size": 0,
            "error": str(e)
        }

def benchmark_keyber(iterations=100):
    results = []

    for _ in range(iterations):
        start = time.perf_counter()
        result = run_kyber_kem()
        end = time.perf_counter()

        results.append({
            "time": end - start,
            "success": result["success"],
            "key_size": result.get("key_size", 0),
            "error": result.get("error, None")
        })

    return results

    
