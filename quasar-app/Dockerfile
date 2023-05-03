# this container is only used for devcontainers / GitHub Codespaces

FROM node:16.16.0

WORKDIR /app/

COPY . .

RUN npm install -g @quasar/cli

COPY start_dev.sh .

CMD ["/app/start_dev.sh"]
