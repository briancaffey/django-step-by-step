set -e

# https://stackoverflow.com/questions/39296472/how-to-check-if-an-environment-variable-exists-and-get-its-value

if [[ -z "${DOCKER_HOST}" ]]; then
  echo "DOCKER_HOST not set, exiting. Run `source env_vars.sh`"
  exit 1;
fi

docker stack rm my-stack
