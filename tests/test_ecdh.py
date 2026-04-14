import sys
import os
from backend.src.benchmarks.ecdh_x25519 import run_ecdh_protocol
# python -m pytest -v -s TO RUN
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_ecdh_output():
    result = run_ecdh_protocol()

    # Check keys exist
    assert "success" in result
    assert "shared_key" in result
    assert "key_size" in result
    assert "error" in result

    # Check correctness
    assert result["success"] is True
    assert result["key_size"] > 0
    assert result["error"] is None

    # Optional: ensure shared key is bytes
    assert isinstance(result["shared_key"], bytes)