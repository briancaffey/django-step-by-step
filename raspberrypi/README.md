# How to deploy this project to a Raspberry Pi

This folder contains files that will allow us to deploy this project to a Raspberry Pi:

- [`deploy.sh`](deploy.sh) is a shell script that will deploy the project to a Raspberry Pi.
- [`stack.yaml`](stack.yaml) is a YAML file that describes the deployment stack that will be used to deploy the project.
- [`README.md`](README.md) is this file.

## Generate a Key on you computer

```
ssh-keygen
```

Copy the key to the Rasberry Pi:

```
ssh-copy-id ubuntu@<raspberry pi id>
```

## How to debug a container that doesn't start

List services:

```
docker stack ls
NAME       SERVICES   ORCHESTRATOR
my-stack   6          Swarm
```

List servics for stack:

```
docker stack services my-stack
ID             NAME                MODE         REPLICAS   IMAGE                            PORTS
6nzb3qeolgvt   my-stack_backend    replicated   0/1        localhost:5000/backend:6331875   *:8000->8000/tcp
h6f6igw4su1p   my-stack_celery     replicated   0/1        localhost:5000/backend:6331875
ig1jx0k4r6jb   my-stack_flower     replicated   0/1        mher/flower:0.9                  *:5555->5555/tcp
l29qi3r4fqsk   my-stack_postgres   replicated   1/1        postgres:13.1
dc10q21ei3yd   my-stack_redis      replicated   1/1        redis:alpine
l197ok4672vl   my-stack_web        replicated   1/1        localhost:5000/nginx:6331875     *:8080->80/tcp
```

Notice that the my-stack_backend service has no replicas. Check logs for this service:

```
docker service logs 6nzb3qeolgvt
```

Log output shows the following:

```
my-stack_backend.1.tk1bl5j63kxn@ubuntu    |     return _bootstrap._gcd_import(name[level:], package, level)
my-stack_backend.1.tk1bl5j63kxn@ubuntu    |   File "<frozen importlib._bootstrap>", line 1014, in _gcd_import
my-stack_backend.1.tk1bl5j63kxn@ubuntu    |   File "<frozen importlib._bootstrap>", line 991, in _find_and_load
my-stack_backend.1.tk1bl5j63kxn@ubuntu    |   File "<frozen importlib._bootstrap>", line 973, in _find_and_load_unlocked
my-stack_backend.1.tk1bl5j63kxn@ubuntu    | ModuleNotFoundError: No module named 'debug_toolbar'
```

This indicates that the `DEBUG` value has probably not been set.
