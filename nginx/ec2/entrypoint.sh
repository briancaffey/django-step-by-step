#!/bin/sh
set -e

# Ensure DOMAIN_NAME is set
if [ -z "$DOMAIN_NAME" ]; then
  echo "Error: DOMAIN_NAME is not set"
  exit 1
fi

# Use envsubst to replace placeholders in the template
envsubst '${DOMAIN_NAME}' < /templates/init.conf.template > /init/init.conf
envsubst '${DOMAIN_NAME}' < /templates/app.conf.template > /output/app.conf


echo "Generated Nginx config:"
cat /init/init.conf
cat /output/app.conf
