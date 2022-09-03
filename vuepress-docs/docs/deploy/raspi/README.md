---
---

# Deploying to a Raspberry Pi

This is a guide to building and running the application on a Raspberry Pi. With docker and docker swarm. This build environment will be similar to what is used with the DigitalOcean deployment.

## Building the Raspberry Pi image

I use [https://www.balena.io/etcher/](https://www.balena.io/etcher/) to build the 64-bit **`Ubuntu Server 20.04.1 LTS`** image (available [here](https://ubuntu.com/download/raspberry-pi)).

```
ubuntu@ubuntu:~$ uname -a
Linux ubuntu 5.4.0-1021-raspi #24-Ubuntu SMP PREEMPT Mon Oct 5 09:59:23 UTC 2020 aarch64 aarch64 aarch64 GNU/Linux
```

## Build data locally on a Raspberry Pi

Assuming that the Raspberry Pi on your local network has address `192.168.1.2`, we need to do the following in order to use it as a single-node swarm cluster:

### Initialize swarm cluster

```
docker swarm init
```

We will be using a single-node swarm cluster for this example, so don't worry about the output of this command. The commands displayed in the above command's output are used for networking mutliple devices into a single swarm cluster.

### Ensure that you have SSH access to the Raspberry Pi

Disable password authentication in the Raspberry Pi's `/etc/ssh/ssh_config` by ensuring that the following line not commented out:

```sh
    PasswordAuthentication no
```

Add your

### Set the `DOCKER_HOST` environment variable

Set the `DOCKER_HOST` environment variable to `ssh://root@192.168.1.2`.

### Run a docker registry on the Raspberry Pi

- [https://docs.docker.com/registry/deploying/](https://docs.docker.com/registry/deploying/)

```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

Why do this? You can think about this as a local version of Docker Hub that runs on your Raspberry Pi.

You will build docker images using code on your local machine, but with the `DOCKER_HOST` set to `ssh://root@192.168.1.2`, the **docker images will be created on the Raspberry Pi**, _not on your development machine_.

Here's what the commands to build the docker images look like:

```sh
docker build -t docker build -t $CI_REGISTRY_IMAGE/backend:$CI_COMMIT_SHORT_SHA -f backend/docker/Dockerfile.prod ./backend/
```

Also, when we deploy the docker swarm stack using `docker stack deploy`, we will use the following environment variables to tell the Raspberry Pi docker daemon to use the images built in that registry. This way we don't have to worry about getting source code onto the Raspberry Pi. Instead, we just make sure that the docker image "artifacts" are sent to the Raspbery Pi.

Set the following environment variables:

- `CI_REGISTRY_IMAGE`: `localhost:5000` <-- localhost here refers to the docker registry running on the Raspberry Pi
- `CI_COMMIT_SHORT_SHA`: `v1` <-- this can be anything that you want to use, but it should change when the images are updated

## Check logs from services that fail to start their containers

```
docker service ps --no-trunc {serviceName}
```

## `build_containers`

This script automats most of the process of building containers and deploying the swarm stack.

It checks to see if `DOCKER_HOST` is set. This should be set with:

```
export DOCKER_HOST=ssh://ubuntu@192.168.1.2
```

The current commit short hash is used to tag the frontend and backend containers.

The `raspi.yml` swarm stack file references a `.env` file for

Where ubuntu is the main user on the Raspberry Pi and `192.168.1.2` is the IP address of the Raspberry Pi.

## Manual actions

Once the stack is deployed, the following must be run:

- migrate
- createsuperuser
- collectstatic

These commands can be called with the following:

```
docker exec $(docker ps -q -f name="backend") python3 manage.py migrate --no-input
docker exec $(docker ps -q -f name="backend") python3 manage.py collectstatic --no-input
docker exec $(docker ps -q -f name="backend") python3 manage.py createsuperuser --no-input
```

These commands run Django management commands in the running backend container. This is similar to how things currently work in `.gitlab-ci.yml`'s `management` stage jobs.
