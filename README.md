# Django Step-by-Step

This project explores some development patterns for Django applications. There are a lot of options to choose from when trying to decide on a web framework. Once you have decided to use Django, there are still a lot of decisions to make when it comes to developing your project. 

- Function-based views vs classed-based views
- Templates vs pure API with JS clients
- Code linting, unit testing and e2e testing
- Continuous Integration frameworks (GitHub actions, GitLab CI, BitBucket Pipelines, CircleCI, etc.)
- Django app and settings directory structure
- Dockerization vs VM vs local virtual environments
- Local service orchestration (docker, compose, minikube, microk8s, shell scripting)
- Dependency management (virtualenv, pipenv, poetry)
- Async task frameworks (such as celery)
- What OS project collaborators will be working on (Linux, Windows, WSL 2, Intel Mac, Apple Silicon Mac)

These considerations are mostly related to local project development. There are a lot more questions to consider when you are ready to share you application beyond localhost. A few of these considerations include:

- Whether or not to use a PaaS (Heroku, Python Anywhere, DigitalOcean App Platoform)
- Which public cloud to use (AWS, GCP, Azure, DigitalOcean, Linuode etc.)
- Level of compute abstraction (for example, in AWS this would include LightSail, EC2, ECS/EKS with and without Fargate, Lambda functions)
- Infrastructure as Code (Terraform, Pulumi, CloudFormation, CDK, etc.)
- CI/CD pipeline implementation

There are other considerations to make as well when considering your project as a whole:

- Mono repo vs multiple repos vs git submodules
- Project documentation tools
- Where to host your code (GitHub, GitLab, BitBucket, etc.)

This project is focused around a simple Django application called **μblog**. μblog is a simple microblog application that demonstrates a fairly straightforward CRUD model. You can think of μblog as a very simple version of Twitter. 

## Application data model

The data model for μblog is fairly simple. There are posts which can be made anonymously or by authenticated users. Users can sign up and author posts once they have verified their email. Users can edit and delete their own posts. Authenticated users can "like" posts. Unauthenticated users cannot edit or delete their posts and they cannot like their own posts.

This data model allows us to focus on some of the fundemental features of Django: ORM and models with foreign keys, many to many relationships, authentication and permission. 

This simple data model is implemented in 5 different ways:

- Django function-based views
- Django class-based views
- Django REST Framework function-based views
- Django REST Framework class-based views 
- GraphQL with Graphene

For the function-based views and class-based views, Django templates are used and Vue.js is used in Django templates for the like button functionality using axios.

The application includes unit tests that cover 100% of the code as well as e2e tests with Cypress.

The code linting and unit tests can run locally in a virtual environment or docker container or they can run from CI pipelines that are also defined in this repo. This project supports running tests in:

- GitHub Actions
- GitLab CI
- BitBucket Pipelines
- CircleCI

The CI pipelines in each of these tools do the same thing, but the YAML syntax for defining the process is slightly diffferent for each tool. Postgres and redis are used in the CI environment for each CI tool as supporting services.

## The code can be found in multiple public repositories:

- **GitHub** (please open any issues, pull requests or discussions here): [https://github.com/briancaffey/django-step-by-step](https://github.com/briancaffey/django-step-by-step)
- **GitLab**: [https://gitlab.com/briancaffey/django-step-by-step](https://gitlab.com/briancaffey/django-step-by-step)
- **BitBucket**: [https://bitbucket.org/briancaffey1/django-step-by-step/](https://bitbucket.org/briancaffey1/django-step-by-step/)

## This project is open source and MIT Licensed

See [LICENSE.md](/LICENSE.md)

## Makefile

This project uses GNU Make to document the common commands needed for development. For an overview of the commands in the Makefile, run:

```
make help
```

Have a look at the `Makefile` in the project's root directory.

## Step-by-Step

A step-by-step guide that documents that process of creating the project can be found in the [STEP_BY_STEP.md](/STEP_BY_STEP.md) document.