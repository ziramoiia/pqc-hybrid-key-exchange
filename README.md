# PQC Hybrid Key Exchange

A dissertation project experimenting with post-quantum cryptography (PQC) and classical–quantum hybrid key exchange approaches. Using a an implementation of Shor's algorithm as a threat demonstration followed by implementations of X25519 ECDH and ML-KEM which, through HKDF, will form the hybrid key excahnge to be benchmarked and evaluated.
 
Contains:
- Backend Python code (Qiskit + classical cryptography)
- Jupyter notebooks for analysis
- Future: frontend React dashboard

## Project Structure
- **src/** – main Python source code  
- **notebooks/** – research and experiment notebooks  
- **tests/** – unit tests  
- **data/** – generated datasets  
- **environment.yaml** – reproducible Conda environment  

## Setup

```bash
conda env create -f environment.yaml
conda activate pqcenv
