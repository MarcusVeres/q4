#!/bin/bash
virtualenv venv &&
# TODO : check if virtualenv command exists
. venv/bin/activate &&
pip install -r pip-requirements.txt &&
python app.py
