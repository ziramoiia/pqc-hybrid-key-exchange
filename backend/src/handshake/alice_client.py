from backend.src.benchmarks.ecdh_x25519 import generate_keypair, derive_shared_secret
from backend.src.benchmarks.kyber_kem import encapsulate

class Alice:
    def __init__(self):
        self.ecdh_private, self.ecdh_public = generate_keypair()

    def generate_secrets(self, bob_ecdh_public, bob_kyber_public):
        # ECDH
        ecdh_secret = derive_shared_secret(self.ecdh_private, bob_ecdh_public)
        # Kyber (encapsulation)
        ciphertext, kyber_secret = encapsulate(bob_kyber_public)

        return {
            "ecdh_secret": ecdh_secret,
            "kyber_secret": kyber_secret,
            "ciphertext": ciphertext
        }
    