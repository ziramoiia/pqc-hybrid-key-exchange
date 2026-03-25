from qiskit import QuantumCircuit

# Create a quantum circuit with 2 qubits
qc = QuantumCircuit(2)
qc.h(0)        # Apply Hadamard gate to qubit 0
qc.cx(0, 1)    # Apply CNOT (controlled-X) gate from qubit 0 to qubit 1

print(qc)      # Print the circuit
qc.draw('mpl') # If you installed visualization support
