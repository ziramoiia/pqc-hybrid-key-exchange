import hashlib
import hmac

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

# With no print statements:
# def derive_hybrid_key(ecdh_key: bytes, kyber_key: bytes) -> bytes:
#     ikm = ecdh_key + kyber_key
#     salt = b"hybrid-handshake-salt"
#     info = b"hybrid key agreement"

#     prk = hkdf_extract(salt, ikm)
#     return hkdf_expand(prk, info, length=32)

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