# Base stage
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

ARG SOURCE_TAG
ENV SOURCE_TAG=$SOURCE_TAG
ENV NUXT_PUBLIC_APP_VERSION=$SOURCE_TAG

ARG PORT=3000
ENV PORT=$PORT

WORKDIR /src


FROM base AS build-prod

COPY --link package.json package-lock.json ./
RUN npm install

COPY --link . .
RUN npm run build


FROM base AS prod

ENV NODE_ENV=production

COPY --from=build-prod /src/.output /src/.output

CMD [ "node", ".output/server/index.mjs" ]


FROM base AS build-dev

ENV NODE_ENV=development

COPY --link package.json package-lock.json ./
RUN npm install


FROM base AS dev

COPY --from=build-dev /src/node_modules /src/node_modules

CMD [ "npm", "run", "dev" ]
