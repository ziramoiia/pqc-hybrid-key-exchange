# Classical ECDH
# This script should:
# Generate a key pair
# Compute a shared secret
# Provide a helper that runs a full handshake between two parties for benchmarking

from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives import serialization #, hashes
#from cryptography.hazmat.primitives.kdf.hkdf import HKDF #HMAC-based key derivation function


# Generate private key
private_key = x25519.X25519PrivateKey.generate()

# Generate public key
public_key = private_key.public_key()