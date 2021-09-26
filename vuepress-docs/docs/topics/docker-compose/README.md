# Using docker-compose

[[toc]]


## Using docker-compose for local development

The easiest way to start the project in a local development environment is to use `docker-compose`.
The following diagram is an overview of how the `docker-compose` local development environment works.

<img :src="$withBase('/diagrams/docker-compose.png')" alt="docker-compose">

### 1. Your local computer

This diagram shows how to run the project on you computer so that it can be changed in real-time using hot-reloading. Hot reloading means that when you save changes to files, application corresponding to the changed file automatically reloads. This allows you to develop quickly without needing to manually restart whenever you make changes. Running your application in a production mode will be different, but the local development environment tries to mimic the production environment as closely as possible.

### 2. The Quasar project

This is the one part of the local development environment that is *not* controlled by docker. It can be, but I find it easier to work the Quasar frontend when it is not running in a container. The Quasar project runs on port 8080 and can be started by running `make quasar-dev`.

### 3. `localhost`

`localhost` is an important concept to grasp when working with docker and docker-compose. Containers run processes on ports, but these ports cannot be access on `localhost` unless the container port is mapped to the port on `localhost`. For example, the `nginx` container has the following port mapping:

```yml
  nginx:
    container_name: nginx
    build:
      context: ./nginx
      dockerfile: dev/Dockerfile
    ports:
      - "80:80" # port 80 in the container is mapped to port 80 on `localhost`
    depends_on:
      - backend
    volumes:
      - ./nginx/dev/dev.conf:/etc/nginx/nginx.conf:ro
    networks:
      - main
```

### 4. `docker`

The outer-most box in the diagram contains all of docker resources: containers, volumes and networks.

### 5. `main`

`main` is the docker network that all development containers run in. Containers on the same network can communicate with each other by referencing the name of the service. All of the services can be found in the docker-compose file:

- `nginx`
- `postgres`
- `pgadmin`
- `redis`
- `redis-commander`
- `backend`
- `celery_default`
- `beat`
- `mailhog`

### 6. `nginx`

The `nginx` container is like the front-door for our application.

### 7. `nginx` routing

All requests to `localhost` (port `80` of `localhost`) are sent to the `nginx` container. The nginx configuration file (`nginx/dev/dev.conf`) is used to route applications to either the `backend` container if the request starts with one of the following:

- `/api/`
- `/admin/`
- `/graphql/`

All other requests will be sent to port 8080 of `localhost` (where the Quasar application is running).

### 8. `backend`

This box represents the Django application server that serves requests for the REST and GraphQL APIs, as well as the Django Admin interface.

Here's how the `backend` container is configured:

```yml
  backend: &backend
    container_name: backend
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    command:
      - "python3"
      - "manage.py"
      - "runserver"
      - "0.0.0.0:8000"
    volumes:
      - ./backend:/code
    ports:
      - "8000:8000"
      - "8888:8888"
    networks:
      - main
    environment:
      - CELERY_TASK_ALWAYS_EAGER=$CELERY_TASK_ALWAYS_EAGER
      - DJANGO_EMAIL_HOST=mailhog
      - DEBUG=1
      - POSTGRES_SERVICE_HOST=postgres
      - REDIS_SERVICE_HOST=redis
      - DJANGO_SETTINGS_MODULE=backend.settings.development
      - AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
      - AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
    depends_on:
      - postgres
      - redis
```

Note the volume mount in the backend service definition:

```yml
    volumes:
      - ./backend:/code
```

This volume mount is what allows the Django application to reload whenever code changes are made. The `runserver` command running in the container will reload when we change files in an editor on our machine (outside of the container) because the directory that contains the files being edited are mapped to the container, so the files on our local computer appear to the `backend` as if they are they are files in the container.

### 9. `postgres`

The Postgres database that persists data for the Django application. This is a pretty standard way to run a database using docker.


### 11. `redis`

Redis is a key-value store that can be used by Django in few different ways:

1. caching requests
1. queueing tasks

### 11. `pgadmin`

`pgadmin` is a utility container that allows you to interact with the Postgres database at a highly detailed level. To access the database, navigate to [`http://localhost:5050`](http://localhost:5050) and use the following credentials:

- email: `pgadmin4@pgadmin.org`
- password: `admin`

### 12. `celery_default`

Celery is the processes that does work on tasks when new tasks are submitted to the queue. The `celery_default` container is configure to only process the `default` task queue. You can configure as many different queues as you want, and a single container can be configured to process tasks for any number of queues.

If there is not much task queuing happening in your application, you probably only need one task queue.

### 13. `beat`

Celery beat is a services that submits tasks to the task queue on a set schedule. The schedule is defined in the `base.py` Django settings file with the `CELERY_BEAT_SCHEDULE` settings value.

Note that both `celery_default` and `beat` both inherit the service settings from the `backend` container. This is done using **YAML anchors**.

### 14. Apple

The following development environment can run on Apple computers with both Intel and Apple Silicon (M1) chips.

### 15. Linux

The development environment and related tooling is fully supported by Linux-based operating systems such as Ubuntu 20.04.

### 16. Windows

When working with Windows, it is recommended to use WSL2. This is a Linux-based environment that is designed to run on Windows, and it fully supports running docker-containers.

To get started with WSL on Windows 10, see the following resources:

- [https://docs.docker.com/desktop/windows/wsl/](https://docs.docker.com/desktop/windows/wsl/)
- [https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers)

## How to start working on the project using docker-compose

To start working on the project with the docker-compose setup, you need to do the following:

1. install docker
1. run `docker compose up --build`
1. exec into the container to start running commands

To exec into the backend container, you can run the following command:

```
docker exec -it backend bash
```

From inside of the container, you can run the following commands:

```
python3 manage.py shell
```

This command will setup the database tables in postgres so that our application can start reading and writing data from and to the Postgres database.

```
python manage.py generate_posts
```

This command can be used to generate 20 random posts.