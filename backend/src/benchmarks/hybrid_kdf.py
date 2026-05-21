import hashlib
import hmac

def hkdf_extract(salt: bytes, input_key_material: bytes) -> bytes:
    prk = hmac.new(salt, input_key_material, hashlib.sha256).digest()
    return prk


def hkdf_expand(prk: bytes, info: bytes, length: int = 32) -> bytes:
    output = b""
    previous_block = b""
    counter = 1

    while len(output) < length:
        data = previous_block + info + bytes([counter])
        current_block = hmac.new(prk, data, hashlib.sha256).digest()

        output += current_block
        previous_block = current_block
        counter += 1

    final_output = output[:length]

    return final_output

# With no print statements:
def derive_hybrid_key(ecdh_key: bytes, kyber_key: bytes) -> bytes:
    ikm = ecdh_key + kyber_key
    salt = b"hybrid-handshake-salt"
    info = b"hybrid key agreement"

    prk = hkdf_extract(salt, ikm)
    return hkdf_expand(prk, info, length=32)

def derive_hybrid_key(ecdh_key: bytes, kyber_key: bytes) -> bytes:
    # Combine secrets
    ikm = ecdh_key + kyber_key

    salt = b"hybrid-handshake-salt"
    info = b"hybrid key agreement"

    prk = hkdf_extract(salt, ikm)
    final_key = hkdf_expand(prk, info, length=32)

    return final_key