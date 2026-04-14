from backend.src.benchmarks.ecdh_x25519 import generate_keypair as ecdh_keygen, derive_shared_secret
from backend.src.benchmarks.kyber_kem import generate_keypair as kyber_keygen, decapsulate

class Bob:
    def __init__(self):
        self.ecdh_private, self.ecdh_public = ecdh_keygen()
        self.kyber_public, self.kyber_secret = kyber_keygen()

    def get_public_keys(self):
        return self.ecdh_public, self.kyber_public

    def compute_secrets(self, alice_ecdh_public, ciphertext):
        # ECDH
        ecdh_secret = derive_shared_secret(self.ecdh_private, alice_ecdh_public)
        # Kyber (decapsulation)
        kyber_secret = decapsulate(ciphertext, self.kyber_secret)

        return {
            "ecdh_secret": ecdh_secret,
            "kyber_secret": kyber_secret
        }
    