---
next: /topics/jwt-authentication
prev: /topics/django
---

# Using docker compose

[[toc]]

## Using docker compose for local development

The easiest way to start the project in a local development environment is to use `docker compose`. The `docker-compose.yml` file in the root of the project contains a number of services for running both the application as well as utility services for debugging and observability.

The application services include:

- nginx
- nuxt-app
- postgres
- redis
- backend (gunicorn process)
- celery_worker
- celery_beat
- migrate

The utility services include:

- pgadmin
- redis-commander
- mailhog
- flower

### `nginx`

The `nginx` service is like the front-door for the application.

### `nginx` routing

All requests to `localhost` (port `80` of `localhost`) are sent to the `nginx` container. The nginx configuration file (`nginx/dev/dev.conf`) is used to route applications to either the `backend` container if the request starts with one of the following:

- `/api/`
- `/admin/`
- `/graphql/`

All other requests will be sent to the nuxt-app service on port 3000 and are served by the Nuxt.js application.

### `backend`

The backend service is the gunicorn server that runs the wsgi application Django application. It serves requests for the REST and GraphQL APIs, as well as the Django Admin interface.
