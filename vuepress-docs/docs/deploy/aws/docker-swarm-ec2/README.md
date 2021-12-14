---
prev: /deploy/digital-ocean
meta:
  - name: description
    content: This article describes how to build a CI/CD pipeline for a Django project using Docker Swarm and AWS EC2.

  - property: 'og:title'
    content: 'Docker Swarm, AWS EC2, CDK and GitHub Actions'

  - property: 'og:description'
    content: This article describes how to build a CI/CD pipeline for a Django project using Docker Swarm and AWS EC2.

  - property: 'og:image'
    content: https://briancaffey.github.io/django-step-by-step/images/docker-swarm-ec2-hero.png

  - property: 'twitter:card'
    content: https://briancaffey.github.io/django-step-by-step/images/docker-swarm-ec2-hero.png

---

<img :src="$withBase('/images/docker-swarm-ec2-hero.png')" alt="docker swarm on ec2">

# Docker Swarm on EC2

[[toc]]

This article will describe a deployment scenario for Django applications that uses a single-node docker swarm cluster running on an EC2 instance.

- First we will take a look at a detailed application architecture diagram that shows the infrastructure components that are provisioned when the construct is deployed in a CloudFormation stack
- Second, we will discuss how you can use this construct to deploy your own Django application on AWS.
- Third, I will discuss some of the pros and cons of this application architecture compared to some of the other application architectures that I have written CDK constructs for in my `django-cdk` construct library.
- Finally, I'll discuss the process I used to develop and debug this construct as well as some of the open questions that I have about this project.

## Pros and Cons of this Application Architecture

### Pros

- **Inexpensive** - This construct keeps costs low by using a single-node Docker swarm cluster in a public subnet and Elastic File Sytem (EFS) for persistent storage rather than managed database services. Other expensive, always-on managed AWS services such as Application Load Balancers and NAT Gateways are not used to save costs
- **Simple deployments** - the infrastructure, configuration and application processes are all deployed with a single command (`make docker-ec2-deploy`)
- **Easy to use** - This construct includes the Portainer container management tool which makes it easy to view logs, open shells, scale processes and more through a web interface. The construct provides a number of other conveniences, such as outputting commonly used commands and values such as the command to access the EC2 instance over SSH and the URL to access the web frontend and other URLs for utility services such as Portainer
- **Open source** - the tools used to develop this construct are all open source. Other constructs in the `django-cdk` construct library use tools that are not open source (such as Elastic Container Service)
- **Thoroughly documented** - the construct includes lots of code comments and in-depth documentation that explains why certain architectural decisions were made and what the tradeoffs are when compared to other options

### Cons

- **Less secure** - applications run in public subnets that are directly exposed to the internet
- **Vertically scalable** (not horizontally scalable) - the only way to easily scale up is to use a larger/optimized EC2 instance type. Docker swarm is designed to work with multiple hosts, but this deployment scenario is limited in that it can only use a single node cluster. If you need to add additional hosts, you will need to set these up manually
- **Opinionated** - This construct is opinionated and has a simple interface that does not expose many different options for how the infrastructure is deployed
- **Not Production-ready** - This construct is not recommended for critical production workloads. It is ideal for running side projects and perhaps staging environments that are not heavily used. Running databases on EFS is possible but generally not recommended. It is better (but more expensive) to use a managed database service such as RDS or Aurora for production environments

## Diagram

<img :src="$withBase('/diagrams/docker-swarm-ec2.png')" alt="docker swarm on ec2">

## Main Infrastructure Components

A. AWS Cloud Development Kit (CDK) - CDK is a tool that will deploy all of the infrastructure outlined in this diagram to an AWS account. CDK is written in TypeScript and can be transpiled to Python and other languages

B. From your computer you will be able to access the application either through SSH or through a public web address that points to the IP address of the EC2 instance where or docker swarm cluster is running.

C. The Route 53 A Record is created by CDK when we run `cdk deploy` (`make docker-ec2-deploy`). It points to the public IP of the EC2 instance where out application is running.

D. S3 bucket used for storing static and media assets. The EC2 instance has permission to access the bucket.

E. Elastic Container Registry (ECR) is used to store the docker images that are defined by our application's Dockerfiles. There are two Dockerfiles used in the application. One is called `backendImage` which includes the Django application. The other is called `frontendImage` which includes the Vue.js application and the nginx configuration which routes requests to our application based on the request path.

F. Virtual Private Cloud (VPC) that is created by CDK.

G. Public Subnet that is also created by the CDK. It is a partition of our VPC that will contain the docker swarm cluster.

H. Security Group that allows access from the internet to our application on port 22 (SSH), 80 (HTTP) and 443 (HTTPS).

I. Elastic Cloud Compute (EC2) instance that is created by CDK. This is where most of the complexity of this construct lies. The EC2 instance is configured to install docker, start a docker swarm cluster, and deploy the application to the swarm cluster. In CDK we define the `UserData` and `CloudFormationInit` scripts that are used to configure the EC2 instance so that no additional manual configuration is required.

J. `stack.yml` is the docker-compose file that is used to deploy the application to the docker swarm cluster. This swarm file is similar to the one used in the DigitalOcean deployment scenario. This file is referenced in the CloudFormationInit script and it is downloaded onto our EC2 instance from GitHub.

K. The docker swarm cluster is started by the CloudFormationInit script. This deployment scenario uses a single-node swarm cluster. There is no automated scaling, but this would be possible if we were to join additional worker nodes to the swarm cluster.

L. `traefik-public` is the name of docker network that includes the `traefik` and `web` services. This network is `external`, meaning that it is created outside of the `stack.yml`. In order for traefik to function properly this network needs to be `external`.

M. Traefik is the service that handles web requests coming into the EC2 instance. It handles SSL termination (HTTPS) and it routes all requests to NGINX.

N. `main` is the main network that includes most of the docker swarm services in out application.

O. The Django application is the service that serves the API and admin backend for our application. All requests that start with `/api`, `/admin` or `/graphql` are routed to the `backend` services and are served by the Django python application.

P. `gunicorn` is the webserver that passes requests to the WSGI application.

Q. NGINX serves three purposes in this deployment scenario. First, it routes all requests starting with `/api` or `/admin` to the Django backend application. Second, it routes all requests starting with `/static/` or `/media/` to the location where static and media files are stored. Third, it serves the Vue.js application frontend application for all other requests, falling back to `index.html`.

R. Celery worker that processes tasks outside of the request/response cycle of the main Django application server. Celery runs the same container that is used in the Django server, but it runs a different process. During the request/response cycle, long-running and compute-intensive tasks are offloaded to celery. Redis is used as a message broker. JSON messages are sent to Redis, and the celery watch Redis for any new tasks that show up and process these tasks. Examples of tasks include processing a large file or sending emails.

S. Postgres is the database that is used to store the data for our application.

T. Vue.js is the JavaScript framework that is used to build the frontend UI application that consumes the Django API.

U. Redis is the key-value store that is used for caching and message broker for celery.

V. `docker stack deploy` is the command that is used to deploy the application into the swarm cluster.

W. The source code for this construct is available here: [https://github.com/briancaffey/django-cdk](https://github.com/briancaffey/django-cdk)

AA. GitHub Repository

### Deployment Pipelines

1. When you push a git tag to GitHub with the pattern `v*`, a GitHub Actions pipeline will be triggered. This pipeline is defined in `.github/workflows/deploy.yml` and it either deploys the application infrastructure with CDK, or it builds and pushes new container images to existing ECR repositories and updates the docker stack with `docker swarm update` in an existing CloudFormation stack.

  Two jobs are defined in the `deploy.yml` workflow. To determine which job runs, the workflow

2. If the condition for deploying with CDK is met, then the CDK stack is either created or updated with `cdk deploy`.

3. CDK creates or updates the stack using the `STACK_NAME` variable that is set in environment secrets.

4. The `DockerEc2` CDK construct provisions an EC2 instance that includes cloud init scripts that creates a docker swarm cluster and deploys our docker stack application.

5. If the CDK stack already exists, then the GitHub Actions deploy workflow only updates the *docker swarm stack* and does not update the *CloudFormation stack* created by CDK. In order to set the correct environment variables that are required by the `docker stack deploy` (to provide environment variables to the `stack.yml` file), the GitHub Action workflow includes a step that calls to `aws cloudformation describe-stacks --stack-name $STACK_NAME` and sets environment variables based on the stack outputs. The following values are collected from the stack outputs:

  - **`Ec2PublicIpAddress`**
  - **`BackendRepositoryUri`**
  - **`FrontendRepositoryUri`**
  - **`ApplicationHostName`**
  - **`PortainerHostName`**

6. If the stack exists, the GitHub Action workflow will update the docker stack with the new container images for the frontend and backend.

7. In addition to using GitHub Actions to deploy the infrastructure, you can also deploy the infrastructure with `make docker-ec2-deploy`. The same Makefile command is used in the GitHub Action workflow.

8. For convenience, the the `cdk deploy` command outputs CloudFormation stack outputs to the console. These outputs provide full commands that can be used to SSH to the EC2 machine or run Django management commands in a running container. The CloudFormation Outputs are also used when updating the application in the GitHub Actions workflow.

### `django-cdk` project workflow

a. projen is a project configuration tool that is used to generate and update different types of software projects including CDK construct libraries written in TypeScript.

b. The `django-cdk` repo is configured to use GitHub Actions to publish the CDK construct library to NPM.

c. The npm package is used in the other repository that contains the application code  called `django-step-by-step`.

## Prerequisites for using this construct

This construct tries to automate as much of the cloud infrastructure as possible, but some parts of your cloud infrastructure can't be automated through IaC. In order to use this construct, you will need to do the following:

- AWS account with user that has Administrator permissions
- aws-cli installed locally configured with the credentials of the administrator user mentioned above
- A domain name purchased through Route 53 (you can use an external domain name, but that won't be covered in this article)
- A `key-pair` that you have stored locally in your `~/.ssh` folder that has appropriate permissions (400)

## Preparing for Deployment

### Creating a GitHub Environment

We can create a new GitHub Environment that we can use for testing the deployment of our `DockerEc2` construct and the deployment of our application to the docker swarm cluster that the `DockerEc2` construct sets up.

### Adding Environment Secrets to GitHub for use in GitHub Actions

- **`SSH_PRIVATE_KEY`** - This is the private key used to connect to the EC2 instance for securely communicating to the swarm cluster on EC2 from our GitHub Actions environment.
- **`STACK_NAME`** - this will be used to name our stack. It defines the environment of the application being deployed.
- **`HOST_NAME`** - this will be used to request the Route 53 A Record
- **`ZONE_NAME`** - this will be used to lookup an existing Hosted Zone

You can add other environment variables that you want to use in backend services (gunicorn, celery, etc), and you must add these to the `environmentVariables` property of the `DockerEc2` construct as a mapping.

### Adding Repository secrets to our GitHub project

For the `django-step-by-step` repository, we can add the following repository secrets that will be available in all environments that we create in this repository:

- **`AWS_ACCESS_KEY_ID`**
- **`AWS_ACCOUNT_ID`**
- **`AWS_DEFAULT_REGION`**
- **`AWS_SECRET_ACCESS_KEY`**

## Deploying the Application

Once all of the GitHub secret values are set, you can deploy the application by pushing a git tag with the format: `v#.#.#`. This will trigger a deployment using the `.github/workflows/deploy.yml` GitHub Actions workflow. This workflow does the following:

- Deploys a CloudFormation stack named with the `STACK_NAME` environment variable
- Deploys an EC2 instance
- The EC2 instance `UserData` scripts sets up the instance to run our application by installing docker and running `docker stack deploy`

This deploys both the infrastructure and the application in the same operation.

## Updating the application

To update the application, there are two options. You can rerun the same infrastructure pipeline that was used to initially create the stack, or you can run the application update pipeline.

Running the infrastructure pipeline may replace the EC2 instance and recreate the swarm cluster (depending on what values in the CDK construct have been changed), but the application data will all be persisted since everything is stored in EFS.

The application update pipeline updates the application by running `docker stack deploy` and also recreates docker secrets in case those have changed. Secret values are updated by changing the value of the GitHub environment secrets in the GitHub UI.

## Debugging and deploying from your local machine



## [12 Factor App](https://12factor.net/)

This construct tries to adhere to the [12 Factor App](https://12factor.net/) model, but it does not do so completely. Here is the 12 Factor App scorecard for this construct:

### I. **Codebase** - *One codebase tracked in revision control, many deploys*

This first factor of the 12 Factor app deserves some clarification. There are **two** code repositories in use here. The first is `django-cdk`. This repo is an AWS CDK construct library that is written in TypeScript and published to NPM and PyPI. It includes several different constructs that help developers and teams deploy Django applications on AWS using different tools (such ECS, EKS and docker swarm).

  The second codebase is `django-step-by-step`. This project is a reference application that several applications in a monorepo structure. It includes a Django project built with Django REST Framework and a Vue.js frontend application built with Quasar, TypeScript, Vue 3 and the Composition API. It is a simple micro-blogging application called μblog. The `django-step-by-step` repo also includes a `cdk` directory that includes the `django-cdk` library as a dependency.

  The `django-cdk` application incudes `django-step-by-step` as a git submodule. The reason for doing this is to make it easier to test deploying an application with the `django-cdk` library without having to redeploy a new version of the `django-cdk` library with each change. You can find the `django-step-by-step` project code referenced in the `django-cdk` project's `integ` files (such as `src/integ/integ.docker-ec2.ts`). These files are used for integration testing (`integ` is short for `integration`).

II. **Dependencies** - *Explicitly declare and isolate dependencies* - The project does this pretty well. Both `django-cdk` and `django-step-by-step` use tools to manage dependencies. `django-cdk` uses `projen` and `django-step-by-step` uses `poetry` for the backend and `yarn` for the frontend. Versions are specified in lots of different files, including swarm stack files, Dockerfiles and construct files.

III. **Config** - *Store config in the environment* - Config for this `DockerEc2` construct is either simple or complex depending on how you look at it. The `DockerEc2` construct is a simple interface where all config values are passed in through an interface called `DockerEc2Props`. These values are then passed into the EC2 metadata service (`UserData` and `CloudFormationInit`) that is used to create the EC2 instance that runs our application. The EC2 metadata sets up the docker swarm cluster, creates secrets that are read from environment variables and deploys the swarm stack with tagged versions of container images that are built and pushed to ECR by CDK (building and pushing images is the first things that happens when you run `cdk deploy` or `make docker-ec2-deploy`). I have gone back and forth on some of the decision around what to include in the `DockerEc2Props` interface and how to structure the EC2 metadata using `cfn-init`.

IV. **Backing services** - *Treat backing services as attached resources* - The postgres database used in this construct runs in a docker container has its data stored in EFS. This is not ideal for a production environment, but it is an OK fit for testing and staging environments.

V. **Build, release, run** - *Strictly separate build and run stages* - CDK does each of these steps in the `make docker-ec2-deploy` command. CDK builds the docker images, pushes them to the ECR registry and then runs the `docker stack deploy` command to run the application in the swarm cluster.

VI. **Processes** - *Execute the app as one or more stateless processes* - This application follows this rule as well as the saying "one process per container". Routing traffic is one are of this project where there could be some room for improvement. The NGINX process is responsible for routing all application traffic, but Traefik could also do path-based routing so that API traffic would need to take once less hop.

VII. **Port binding** - *Export services via port binding* - Traefik is the only swarm service that exposes ports 80 and 443. All application traffic goes to the `nginx` container, and is then routed to either the frontend app, the backend app or possibly static files as well (unless the application is using S3 for static and media file storage).

VIII. **Concurrency** - *Scale out via the process model* - This is one point where the construct does abide by the 12 Factor App. While docker swarm is designed to work with multiple nodes in a cluster, the application infrastructure deployed by this construct uses a single-node swarm cluster.

IX. **Disposability** - *Maximize robustness with fast startup and graceful shutdown* -
This construct really embraces disposability. Each time your run `make docker-ec2-deploy` with changes to either application code or infrastructure code, the EC2 instance and swarm cluster will be completely deleted and completely recreated. Data is stored in EFS and is persisted between deploys. It might be possible to use EBS (Elastic Block Storage) to store application data, but EFS is better suited or this type of application since it can be used by multiple EC2 instances at the same time (the existing EC2 instance and the new EC2 instance that is replacing the old instance). It is not necessary to completely delete the EC2 instance, and this does make the process longer since docker needs to be reinstalled on each deploy. The big downside is that you are having to wait around for the EC2 instances to start. There may also be extra data costs associated with downloading packages and files in the CloudFormationInit metadata.

X. **Dev/prod parity** - *Keep development, staging, and production as similar as possible* - If your production environment uses ECS, your test and staging environments should also use ECS. This construct is not ideal for production workloads, but it might be useful for prototyping and side projects that you don't want to spend a lot of money on.

XI. **Logs** - *Treat logs as event streams* - This application does not do anything special with logs. Logs can be be access easily through the Portainer interface.

XII. **Admin processes** - *Run admin/management tasks as one-off processes* - This construct makes it easy to run one-off processes. The construct uses CloudFormation Outputs so that you can easily access a shell in the EC2 instance or a container, or access the application website or admin dashboard. Here are some of the CloudFormation Outputs:

```
Outputs:
DockerEc2Stack.DockerEc2SampleEc2InstanceSshCommand44C8616E = ssh -i "~/.ssh/my-key.pem" ec2-user@ec2-12-345-678-910.compute-1.amazonaws.com
DockerEc2Stack.DockerEc2SampleEfsFileSystemArnC86E9170 = arn:aws:elasticfilesystem:us-east-1:12345678910:file-system/fs-abc123
DockerEc2Stack.DockerEc2SampleEfsFileSystemId945B74CE = fs-abc123
DockerEc2Stack.DockerEc2SamplePortainerUrl209DBD88 = https://portainer.domain.com
DockerEc2Stack.DockerEc2SampleSiteUrlEA704659 = https://app.domain.com
```

## Terminology disambiguation

Sometimes the same terms are used in different contexts, and it might be confusing, so here is some clarification and disambiguation.

- **deployment** - Deployment is a term that has at least three different meanings in the context of this project. First, a deployment is the name of a Kubernetes resource that is similar to a docker swarm service. A deployment is typically used to refer to the act of creating or updating a new version of the application. This constructs uses CDK to combine the deployment of infrastructure and the deployment of the application. The infrastructure configures and executes the deployment of the application with CloudFormationInit metadata.

- **stack** - stack is the term used by CloudFormation to describe a set of resources that are deployed together. `stack` is also a term used in docker swarm where it means a collection of services that make up an application.

- **docker swarm vs docker compose** - Docker swarm is a **container orchestration tool** that is built into docker. It is similar to docker compose, but there are some important differences. Applications running in docker swarm clusters are defined by "stack files". Stack files are YAML files that use the docker compose file format, but there are some differences. For example, docker compose lets you reference a Dockerfile in the `image` key, but stack files require that an image URI is specified.

  Docker compose was originally developed as a tool for local development, and docker swarm was designed for running container workloads in production. Docker compose can be used to run applications in production, however.

  This deployment scenario is similar to the one described in the <a :href="$withBase('/deploy/digital-ocean/')">DigitalOcean</a> section.

- **application, project, construct** - These words may be confusing. `construct` refers to the `DockerEc2` construct that spins up the infrastructure and the application. `application` refers to the application that is running in the docker swarm cluster. `project` refers to the application, construct and infrastructure as whole.

## Discussion

Some of the important topics I wanted to address with this project include:

### Combined and dynamic infra and app deployment
- how to do combined deployment of infrastructure and application
- how to do application deployments without updating infrastructure
- how write reusable infrastructure code that is sufficiently decoupled from application code and also not too opinionated

### Speeding up feedback loop
- how to speed up the iterative process of "spinning up" and "tearing down" infrastructure
- how to develop low cost, quasi-production-grade environments for experimenting with app development and CI/CD tooling
- Getting a better understanding of EC2, CloudFormationInit and UserData
- NFS vs EBS for providing persistent storage to docker swarm

### Library design
- Balancing ease of use with complexity
- Use minimal inputs (secrets entered to GitHub, stack name)

## Next steps

My next goal is to improve `django-cdk` and apply my learnings from working on the `DockerEc2` construct to other constructs I have written for ECS and EKS.

### Using the `DockerEc2` construct for testing

- Trying different python base images
- Quickly testing dependency version updates
- Measure costs of running an instance of the application

### Additional work

- Add tests for the `DockerEc2` construct
- Cache images in GitHub Actions