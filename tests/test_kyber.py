import sys
import os
#python -m pytest -v -s TO RUN
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from backend.src.benchmarks.kyber_kem import run_kyber_kem

def test_kyber_output_structure():
    print("TEST")
    result = run_kyber_kem()

    assert "success" in result
    assert "key_size" in result
    assert "error" in result

    assert result["success"] == True
    assert result["key_size"] > 0
    assert result["error"] is None