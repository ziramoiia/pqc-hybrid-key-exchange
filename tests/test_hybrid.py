#python -m pytest -v -s TO RUN
from backend.src.benchmarks.hybrid_handshake import run_hybrid_handshake

def test_hybrid_handshake():
    result = run_hybrid_handshake()

    assert result["success"] == True
    assert result["shared_key"] is not None
    assert result["final_key_size"] == 32
    assert result["error"] is None