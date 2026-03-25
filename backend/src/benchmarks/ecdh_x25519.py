# Classical ECDH
# This script should:
# Generate a key pair
# Compute a shared secret
# Provide a helper that runs a full handshake between two parties for benchmarking

from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives import serialization #, hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF #HMAC-based key derivation function
from cryptography.hazmat.primitives import hashes
import time # for benchmark_helper

def generate_keypair():
    # Generate private key
    private_key = x25519.X25519PrivateKey.generate()
    # Generate public key
    public_key = private_key.public_key()

    # Serializing for storage or transmission MUST BE 32BYTES LONG KEY
    private_bytes = private_key.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption()
    )
    public_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    return private_key, public_key, private_bytes, public_bytes

def derived_shared_secret(private_key, peer_public_bytes):
    # Process key through a Key Derivation Function for a secure fixed-length key
    # Assume 'private_key' is your loaded X25519 private key object
    # Assume 'peer_public_key_bytes' is the bytes of your peer's public key

    peer_public_key = x25519.X25519PublicKey.from_public_bytes(peer_public_bytes)
    shared_secret = private_key.exchange(peer_public_key)

    return shared_secret

def hkdf_derive(shared_secret, info=b'handshake data'):
    hkdf = HKDF(
        algorithm=hashes.SHA256(),
        length=32, # e.g., 32 bytes for AES-256
        salt=None, # Consider using a salt in production
        info=info, # Context-specific label
    )
    return hkdf.derive(shared_secret)

def run_ecdh_handshake():
    try:
        #Alice generated keys
        alice_priv, _, _, alice_pub_bytes = generate_keypair() #_ = ignore private_bytes and a/b_pub as value not required
        #Bob generated keys
        bob_priv, _, _, bob_pub_bytes = generate_keypair()
        #Exchange and derive secrets 
        alice_shared = derived_shared_secret(alice_priv, bob_pub_bytes) #alice private key and bob public
        bob_shared = derived_shared_secret(bob_priv, alice_pub_bytes) #bob private key and alice public
        #Apply HKDF
        alice_final = hkdf_derive(alice_shared)
        bob_final = hkdf_derive(bob_shared)
        #Validate correctness 
        success = alice_final == bob_final
        return {
            "success": success,
            "shared_key": len(alice_final) #or bob_final it is the same string
        }
    except Exception as e: #“Error handling was incorporated into the handshake simulation to ensure that failures did not interrupt benchmarking execution. This allowed reliability to be measured alongside performance, with unsuccessful exchanges recorded and analysed.”
        return {
            "success": False,
            "key_size": 0,
            "error": str(e)
        }

def benchmark_ecdh(iterations=100):
    results = []
    for _ in range(iterations):
        start = time.perf_counter()
        result = run_ecdh_handshake()
        end = time.perf_counter()

        results.append({
            "time": end - start, #performance metric
            "success": result["success"], #reliability metric
            "key_size": result.get("key_size", 0), # should be 32
            "error": result.get("error", None) #failure metric
        })
        
    return results