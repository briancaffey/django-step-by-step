# copy this file to env_vars.sh, change the DOCKER_HOST value and run `source .env_vars.sh`

export DOCKER_HOST=ssh://ubuntu@<raspberry pi IP>
export POSTGRES_PASSWORD=postgres
export BACKEND_API_URL=http://<raspi address>:<raspi port>