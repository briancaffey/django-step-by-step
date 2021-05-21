#!/bin/bash

# start gunicorn process
gunicorn -t 300 -w 4 -b 0.0.0.0:8000 backend.wsgi
