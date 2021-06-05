#!/bin/bash

# if the PORT environment variable is set (when using heroku), use that
# otherwise use 8000
if [[ -z $PORT ]]; then
    PORT=8000
fi

# start gunicorn process
gunicorn -t 300 -w 4 -b 0.0.0.0:${PORT} backend.wsgi
