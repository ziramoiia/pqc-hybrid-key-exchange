# Classical ECDH
# This script should:
# Generate a key pair
# Compute a shared secret
# Provide a helper that runs a full handshake between two parties for benchmarking

import time
from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.kdf.hkdf import HKDF # for benchmarking full ecdh only
from cryptography.hazmat.primitives import hashes # for benchmarking full ecdh only

def generate_keypair():
    # Generate private key
    private_key = x25519.X25519PrivateKey.generate()
    # Generate public key
    public_key = private_key.public_key()

    public_bytes = public_key.public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw
    )

    return private_key, public_bytes

def derive_shared_secret(private_key, peer_public_bytes):
    peer_public_key = x25519.X25519PublicKey.from_public_bytes(peer_public_bytes)
    shared_secret = private_key.exchange(peer_public_key)

    return shared_secret

def hkdf_derive(shared_secret, info=b'ecdh-handshake'):
    hkdf = HKDF(
        algorithm=hashes.SHA256(),
        length=32,
        salt=None, 
        info=info,
    )
    return hkdf.derive(shared_secret)

def run_ecdh_protocol():
    try:
        print("\n[Running FULL ECDH Protocol]")

        # Key generation
        alice_priv, alice_pub = generate_keypair()
        bob_priv, bob_pub = generate_keypair()
        print("Key Generation...")
        print("Alice pub len:", len(alice_pub))
        print("Bob pub len:", len(bob_pub))

        # Raw shared secrets
        alice_shared = derive_shared_secret(alice_priv, bob_pub)
        bob_shared = derive_shared_secret(bob_priv, alice_pub)

        print("Alice shared secret:", (alice_shared))
        print("Bob shared secret:", (bob_shared))
        # HKDF applied
        alice_final = hkdf_derive(alice_shared)
        bob_final = hkdf_derive(bob_shared)
        print("Applying HKDF...")
        print("Alice pub len:", len(alice_pub))
        print("Bob pub len:", len(bob_pub))

        success = alice_final == bob_final
        print("ECDH Protocol Complete")

        return {
            "success": success,
            "shared_key": alice_final,
            "key_size": len(alice_final),
            "error": None
        }

    except Exception as e:
        return {
            "success": False,
            "shared_key": None,
            "key_size": 0,
            "error": str(e)
        }

