#!/bin/bash

ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
IMAGE_TAG=${IMAGE_TAG:-latest}
echo "IMAGE_TAG is ${IMAGE_TAG}"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

docker build -t frontend:$IMAGE_TAG -f nginx/ecs/Dockerfile --progress=plain --no-cache .

docker tag frontend:$IMAGE_TAG $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/frontend:$IMAGE_TAG

docker push $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/frontend:$IMAGE_TAG
