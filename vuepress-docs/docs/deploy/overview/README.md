# Overview of options for deploying μblog

This page will provide an overview of the different ways that μblog can be deployed using different services and tools.

Here are some of the different ways that you can deploy the μblog application, from simple to complex:

- docker swarm running on a Raspberry Pi on your local network
- Kubernetes cluster running locally on minikube
- Heroku (for Django app) & Netlify (for the Vue/Quasar app)
- DigitalOcean using docker swarm pre-installed on a droplet from the DigitalOcean marketplace
- AWS ECS cluster running on Fargate compute instances
- AWS EKS cluster running on EC2 instances

## CI/CD Tools

For docker swarm and local kubernetes deployments, a shell script is used to initiate the deployment process which involves building containers and and CLI tools for deployment:

- `docker stack deploy` for docker swarm
- `kubctl apply` for minikube

Heroku uses the `git push` git command to deploy changes when new commits are pushed to the Heroku repository.

When the application runs on docker swarm on DigitalOcean, it is updated using `docker stack deploy` from a GitLab CI/CD pipeline that remotely connects to the docker daemon runnong on the DigitalOcean droplet using SSH.

### [`django-cdk`](/deploy/aws)

The ECS and EKS deployments use the Cloud Development Kit (CDK) to both create AWS infrastructure and deploy μblog. The CDK code (Infrastructure as Code) is written in TypeScript and it references a npm package called `django-cdk` which was developed together with μblog. `django-cdk` is a library containing high-level CDK constructs for deploying secure and scalable Django applications on AWS.

## Containers and container orchestration

To clarify terminology, all of the deployment targets (except for Heroku) use containers to run the applicaiton. The main difference in these deployments is the container orchestration tool used. The container orchestration tool refers to the tools that keeps track of the containers and their lifecycle and scaling. There are four main conatiner orchestration tools:

- docker-compose (used mostly for local development)
- docker swarm
- ECS (proprietary container orchestration tool from AWS, good AWS integration)
- Kubernetes (Elastic Kubernetes Service) (an open-source version of Kubernetes that allows for running Kubernetes workloads on AWS)

## Differences

There are some variations in how the application is deployed across the different deployment targets.

- How and where to run Django management commands (migrations)
- Frontend applicaiton hosting (nginx, S3, CDN)
- Static files (collectstatic, nginx, S3, CDN)
- Media files (images, videos, etc)
- Domain and subdomains for the application (this is very important)
- SSL certificates (this is also very important)
- CI/CD (Updating the application)
- Platform (amd64, arm64, M1 and Raspberry Pi 4)
- Costs (free, low, medium, high)
- Security (NAT, VPN, Firewall, etc)
- Performance
- Scalability
- Reliability
- Availability
