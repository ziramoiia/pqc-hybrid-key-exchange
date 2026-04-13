import oqs

print("Liboqs version:", oqs.oqs_version())
print("Enabled KEMs:", oqs.get_enabled_kem_mechanisms())

#>>> Profile loaded successfully
#PS C:\Code\pqc-hybrid-key-exchange> activate
#PS C:\Code\pqc-hybrid-key-exchange> conda activate pqcenv
#(pqcenv) PS C:\Code\pqc-hybrid-key-exchange> & C:/Code/envs/pqcenv/python.exe c:/Code/pqc-hybrid-key-exchange/tests/test_liboqs.py
#C:\Code\envs\pqcenv\lib\site-packages\oqs\__init__.py:1: UserWarning: liboqs version (major, minor) 0.15.0 differs from liboqs-python version 0.14.1
#  from oqs.oqs import (
#Liboqs version: 0.15.0
#Enabled KEMs: ('ML-KEM-512',)