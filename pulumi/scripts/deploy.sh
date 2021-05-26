# build and push container for pulumi

BACKEND=backend
VERSION=$(git rev-parse --short HEAD);
BACKEND_IMAGE=$BACKEND:$VERSION

# build backend container
docker build \
    -t $BACKEND_IMAGE \
    -f backend/Dockerfile.dev \
    ./backend


## load the tagged image into minikube
minikube image load $BACKEND_IMAGE

## make the tagged image availabe to pulumi as an environment variable
export BACKEND_IMAGE=$BACKEND_IMAGE
export NAMESPACE=app

## deploy
cd pulumi && pulumi up