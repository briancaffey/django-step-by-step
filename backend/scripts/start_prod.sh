#!/bin/bash

if [[ -z $PORT ]]; then
    PORT=8000
fi

# start gunicorn process
gunicorn -t 300 -w 4 -b 0.0.0.0:${PORT} backend.wsgi
