FROM node:14 as build-stage
ARG VERSION
ENV VERSION=$VERSION
WORKDIR /app/
COPY quasar-app/package.json /app/
RUN npm cache verify
RUN npm rebuild node-sass
RUN npm install -g @quasar/cli
RUN npm install --progress=false
COPY quasar-app /app/
RUN quasar build -m spa

# ci stage
FROM --platform=linux/amd64 nginx:1.13.12-alpine as production
COPY nginx/prod/prod.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/spa /dist/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
