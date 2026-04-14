import sys
import os
from backend.src.handshake.hybrid_protocol import run_hybrid_protocol
#python -m pytest -v -s TO RUN
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

def test_hybrid_handshake():
    result = run_hybrid_protocol()

    assert result["success"] == True
    assert result["shared_key"] is not None