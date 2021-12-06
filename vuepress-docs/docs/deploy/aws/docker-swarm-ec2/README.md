---
prev: /deploy/digital-ocean
---

# Docker Swarm on EC2

This article will describe a deployment scenario for Django applications that uses a single-node docker swarm cluster running on an EC2 instance.

- First we will take a look at a detailed application architecture diagram that shows the infrastructure components that are provisioned when the construct is deployed in a CloudFormation stack
- Second we will discuss how you can use this construct to deploy your own Django application on AWS.
- Third, I will discuss some of the pros and cons of this application architecture compared to some of the other application architectures that I have written CDK constructs for in my `django-cdk` construct library.
- Finally, I'll discuss the process I used to develop and debug this construct as well as some of the open questions that I have about this project.

## Docker swarm vs docker compose

Docker swarm is a **container orchestration tool** that is built into docker. It is similar to docker compose, but there are some important differences. Applications running in docker swarm clusters are defined by "stack files". Stack files are YAML files that use the docker compose file format, but there are some differences. For example, docker compose lets you reference a Dockerfile in the `image` key, but stack files require that an image URI is specified.

Docker compose was originally developed as a tool for local development, and docker swarm was designed for running container workloads in production. Docker compose can be used to run applications in production, however.

This deployment scenario is similar to the one described in the <a :href="$withBase('/deploy/digital-ocean/')">DigitalOcean</a> section.

## Diagram

<img :src="$withBase('/diagrams/docker-swarm-ec2.png')" alt="docker swarm on ec2">

## Diagram Legend

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

## About this construct

Compared with ECS and EKS, this construct is simpler, more portable and less expensive to run. It does not use managed AWS services like RDS, ElastiCache, Application Load Balancers or NAT Gateways (for network address translation). This deployment scenario is more suited for demos, toy projects and experimentation. docker swarm can be installed on an cloud provider, but running docker swarm in the AWS ecosystem allows you to easily take advantage of the other AWS services if your application requires them.

On the other hand, this construct does not do autoscaling and does not follow AWS security best practices since the application workloads runs in a public subnet.

## Prerequisits for using this construct

This construct tries to automate as much of the cloud infrastructure as possible, but some parts of your cloud infrastructure can't be automated through IaC. In order to use this construct, you will need to do the following:

- AWS account with user that has Administrator permissions
- aws-cli installed locally configured with the credentials of the administrator user mentioned above
- A domain name purchased through Route 53 (you can use an external domain name, but that won't be covered in this article)
- A `key-pair` that you have stored locally in your `~/.ssh` folder that has appropriate permissions (400)

## `DockerEc2Props`

Once you have set up each of the above, we can start thinking about the parameters that the `DockerEc2` takes. This is called `DockerEc2Props`:

```ts
export interface DockerEc2Props {

  /**
   * Path to the Dockerfile
   */
  readonly imageDirectory: string;

  /**
   * Frontend Image directory (nginx, quasar-app)
   */
  readonly frontendImageDirectory: string;

  /**
   * Frontend Image Dockerfile
   */
  readonly frontendImageDockerfile: string;

  /*
   * Route 53 Zone Name, for example my-zone.com
   */
  readonly zoneName: string;

  /**
   * The domain name to use, such as example.my-zone.com
   */
  readonly domainName: string;

  /**
   * Key pair name used for SSH to the EC2 instance
   */
  readonly keyName: string;

  /**
   * Extra Environment Variables to set in the backend container
   */
  readonly environmentVariables?: { [key: string]: string };
}
```

## Lessons learned

When deploying on AWS I usually use ECS with other managed services such as RDS and ElastiCache. Before completing this project, I had some experience setting up and deploying to docker swarm, but mostly with either DigitalOcean Droplets or a Raspberry Pi in my home network.

### `AWS::CloudFormation::Init`

Using CDK and EC2 pushed me out of my comfort zone and forced me to dig into [CloudFormationInit](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-init.html), something I was not very familiar with before working with it.

I still don't completely understand how `AWS::CloudFormation:Init` works. To make it in my application, I combined a few different examples from other repos that

- [https://github.com/chhatbarjignesh/reportportal-aws-cfn](https://github.com/chhatbarjignesh/reportportal-aws-cfn) this is a CloudFormation script that runs a i
-

### Traefik

Traefik is a useful tool and it works very well as a way to request SSL certificates for securing your application. When debugging this application I came across some rate-limiting issues. You are not able to

### no such image found


## [12 Factor App](https://12factor.net/)

## Next steps

- Update application with separate pipeline
- Use GitLab CI/CD