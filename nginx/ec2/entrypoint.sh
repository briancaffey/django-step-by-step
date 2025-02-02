#!/bin/sh
set -e

# Ensure DOMAIN_NAME is set
if [ -z "$DOMAIN_NAME" ]; then
  echo "Error: DOMAIN_NAME is not set"
  exit 1
fi

# Use envsubst to replace placeholders in the template
envsubst '${DOMAIN_NAME}' < /templates/init.conf.template > /output/init.conf
envsubst '${DOMAIN_NAME}' < /templates/default.conf.template > /output/default.conf


echo "Generated Nginx config:"
cat /output/init.conf
cat /output/default.conf
