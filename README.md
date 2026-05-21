# Bridging Classical and Quantum Security: Evaluating a Hybrid Quantum-Safe Key Exchange Protocol

A dissertation project exploring post-quantum cryptography (PQC) through the implementation and evaluation of three key exchange approaches:
- Classical cryptography
- Post-quantum cryptography
- Hybrid cryptography

The project implements:
- X25519 Elliptic Curve Diffie-Hellman (ECDH)
- ML-KEM-512 (Kyber)

These are combined using HKDF to produce a hybrid post-quantum key exchange protocol which is benchmarked and evaluated through an interactive dashboard.

## Features
- Classical ECDH key exchange implementation
- Post-quantum ML-KEM-512 implementation
- Hybrid ECDH + ML-KEM key exchange
- HKDF-based shared key derivation
- Automated benchmarking system
- Flask REST API
- Interactive React dashboard
- Statistical performance visualisations
- JSON and CSV benchmark export

## Project Structure
- **backend/** – Main Python source code  
- **frontend/** – React frontend dashboard
- **notebooks/** – research and experiment notebooks  
- **tests/** – Unit and Integration tests  
- **data/** – Generated Benchmark data 
- **environment.yaml** – Reproducible Conda environment  

## Setup
Create and activate conda environment:
```bash
conda env create -f environment.yaml
conda activate pqcenv
```
## Start Flask Server
From the project root:
```bash
python -m backend.src.api.app
```
## Start React Server
```bash
cd Frontend
npm install
npm run dev
```
## Disclaimer
This project was developed for educational and research purposes and is not intended for production cryptographic deployment.