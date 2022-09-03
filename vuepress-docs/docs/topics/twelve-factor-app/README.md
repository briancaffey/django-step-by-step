---
next: /topics/django/
---

# 12 Factor App

This project tries to follow the [12 Factor App](https://12factor.net/) principles. Here are the 12 factors of the 12 Factor app with a brief description of how they are achived in this project across multiple deployment environments.

## I: Codebase

The code can be found in multiple public repositories:

> One codebase tracked in revision control, many deploys

- **GitHub** (please open any issues, pull requests or discussions here): [https://github.com/briancaffey/django-step-by-step](https://github.com/briancaffey/django-step-by-step)
- **GitLab**: [https://gitlab.com/briancaffey/django-step-by-step](https://gitlab.com/briancaffey/django-step-by-step)
- **BitBucket**: [https://bitbucket.org/briancaffey1/django-step-by-step/](https://bitbucket.org/briancaffey1/django-step-by-step/)

In the case of AWS deployment with CDK, there are multiple applications that are shared as dependencies through libraries (**II: Dependencies**).

## II: Dependencies

There are a few different ways in which this project manages dependencies:

- `poetry` manages Python dependencies
- `npm` manages TypeScript/JavaScript dependencies for the construct library application
- The `Dockerfile` defines dependencies needed for the container, including the version of Python to use
- The `django-cdk` library defines specific version of AWS services to use, such as the version of postgres and Redis that are used

## III: Config

There is a good amount of environment variables used for configuration both locally and in the different production environments.

Locally, the application uses default values that allow development in a virtual environment to work without the need for configuring any environment variables as a separate step.

For example, Postgres is configured with the following default values in the Django application:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("POSTGRES_NAME", "postgres"),
        "USER": os.environ.get("POSTGRES_USERNAME", "postgres"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "postgres"),
        "HOST": os.environ.get("POSTGRES_SERVICE_HOST", "localhost"),
        "PORT": os.environ.get("POSTGRES_SERVICE_PORT", 5432),
    }
}
```

The `django-cdk` application uses environment variables to determine which options to use for deployment. For example, the `HostedZoneName` is read in from the environment and use to determin which DNS records and ACM records to create. CloudFormation Stacks help to isolate environments, and no infrstructure is shared between environments.

> A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials.

This is another important point from the 12 Factor App principles that is true for this project.

One interesting part about config is the Postgres password for the ECS environment. The ECS environment uses an AWS Secrets Manager `Secret` to store the database password information, including the password, in a JSON string.

The name of this `Secret` is passed as an environment to the Django application, and the Django application uses another library to retrieve and cache the database password for later use. Again, the value of the secret is not passed to Django as an environment variable, but the name of the `Secret` (from AWS Secrets Manager) is the value passed. This way we don't even have to worry about what the password is. It is not stored in the code base and it is not even stored anywhere in config (until is created in AWS Secrets Manager).

## IV: Backing Services

In AWS, it is easy to start relying on AWS services such as RDS, ElastiCache, S3 and other services.

## V: Build, release, run

This step in the 12 Factor App is where CDK really shines. The `cdk deploy` command builds, releases and runs the application in one command. First, it is important to note that CDK uses something called `DockerImageAsset`, which allows us to point to the directory and Dockerfile of an application that we want to build and push to a docker registry. To use this feature, we must first run `cdk bootstrap` once in our AWS account. This will create the ECR registry that any `DockerImageAsset` will be pushed to.

When `cdk deploy` runs, it first builds and pushes the docker image to the ECR registry created by the `cdk bootstrap` command. `cdk deploy` then proceeds to create or update the AWS resources defined in the construct. Another advantage of CDK is automatic rollbacks.

## VI: Processes

> Execute the app as one or more stateless processes

In each environment, both local and non-local, the application's processes are clearly defined.

The CDK construct is passed a list of strings that define the processes that are run in the container for the wep services as well as the celery worker and celery beat proceses.

## VII: Port binding

This is done in ECS.

## VIII: Concurrency

> The array of process types and number of processes of each type is known as the process formation.

The ECS construct has a simple process formation: web service that scales up and down between a minimum and maximum number of instances. Celery workers that scale between a minimum and maximum number of instances, and a single celery beat process.

## IX: Disposability

Using CDK is a great way to put application disposability into practice. ECS services make sure that some number of ECS Tasks are running at a given point in time. If we go into the AWS console and delete a task, it will be started again almost instantly.

## X: Dev/prod parity

This project makes dev/prod partiy somewhat trivial. Using Infrastrucutre as Code, we can be condifent that two environments will only vary by the values that are passed in through through environment variables. If the only difference between two application stacks is the subdomain, then we can expect that everything else about the two applications is similar and that none of the other resources between the two enviroments will be shared.

## XI: Logs

CloudWatch is a great tool for monitoring logs and getting observability with minimal effort.

## XII: Admin processes

> Run admin/management tasks as one-off processes

Developers will often wish to do one-off administrative or maintenance tasks for the app, such as:

- Running database migrations
- Running a console
- Running one-time scripts committed into the app’s repo

With ECS and CDK, management commands can be run easily either through automation or using a new tool called ECS Exec.

To run automated tasks, `managementCommandProps` can be passed a value of `true` (`false` by default). This will run the task each time the application is deployed with `cdk deploy`. This uses the an AWS Custom Resource that is defined in the construct. The CR's `onCreate` and `unUpdate` are set to an `AwsSdkCall` that runs `ecs:RunTask` with the appropiate parameters.

If you do not want to run database migrations automatically as a Custom Resource in CDK, you can use the AWS CLI to run the command from your CI tool, or you can use ECS Exec.

ECS Exec would also be a good choice if you want to run a one-time script or open a console in the container.
