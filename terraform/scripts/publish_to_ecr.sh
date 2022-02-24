#!/bin/bash

ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
IMAGE_TAG=${IMAGE_TAG:-latest}
echo "IMAGE_TAG is ${IMAGE_TAG}"

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

docker build -t backend ./backend

docker tag backend:latest $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/backend:$IMAGE_TAG

docker push $ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/backend:latest

