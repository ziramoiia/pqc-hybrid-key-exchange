from flask import Flask, jsonify
from flask_cors import CORS # For React and Flask to communicate
import json
from backend.src.benchmarks.benchmark_runner import run_all_benchmarks
from backend.src.benchmarks.ecdh_x25519 import run_ecdh_protocol
from backend.src.benchmarks.kyber_kem import run_kyber_kem
from backend.src.handshake.hybrid_protocol import run_hybrid_protocol

# python -m backend.src.api.app TO START FLASK SERVER

app = Flask(__name__)
CORS(app) 

@app.route("/")
def home():
    return {"message": "API is running"}

# Benchmark endpoint
# @app.route("/api/benchmark")
# def benchmark():
#     results = run_all_benchmarks(iterations=69)
#     return jsonify(results)

@app.route("/api/benchmark")
def benchmark():
    with open("data/benchmark_results.json") as f:
        return jsonify(json.load(f))
    
@app.route("/api/run/hybrid")
def run_hybrid():
    return jsonify(run_hybrid_protocol())

# Individual endpoints
@app.route("/api/ecdh")
def ecdh():
    return jsonify(run_ecdh_protocol())

@app.route("/api/kyber")
def kyber():
    return jsonify(run_kyber_kem())

if __name__ == "__main__":
    app.run(debug=True)