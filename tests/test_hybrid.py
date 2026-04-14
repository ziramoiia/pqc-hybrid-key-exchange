from backend.src.handshake.hybrid_protocol import run_hybrid_protocol

def test_hybrid_handshake():
    result = run_hybrid_protocol()

    assert result["success"] == True
    assert result["shared_key"] is not None