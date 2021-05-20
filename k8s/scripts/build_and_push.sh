# build and load images into minikube cluster

PORT=5000
# git hash
VERSION=$(git rev-parse --short HEAD);
REGISTRY_HOST=localhost

IMAGE=$REGISTRY_HOST:$PORT/backend:$VERSION
echo $IMAGE

# build backend container
docker build \
    -t $IMAGE \
    -f backend/Dockerfile.dev \
    ./backend

minikube image load $IMAGE
