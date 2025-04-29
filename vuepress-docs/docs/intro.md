---
next: /topics/django
---

# Project Introduction

This is a reference project for developing and deploying web applications built with Python and JavaScript. The application in this project is built with Django and Nuxt.js, powerful frameworks for backend business logic and frontend web clients.

The process for local development is designed to be simple and frictionless for developers using any device or operating system.

This project also provides a blueprint and simple operations manual for running the application on the public internet using Amazon Web Services with popular Infrastructure as Code libraries for deploying cloud infrastructure and GitHub Actions workflows for running robust automation.

This project intends to provide a working, up-to-date example of how to build a web application with popular technology choices and sensible configuration choices:

- Python/Django backend
- Vue/Nuxt frontend
- AWS
- Infrastructure as Code libraries for deploying cloud resources
- AWS ECS for container orchestration
- GitHub Actions for infrastructure and application updates

There are lots of ways to run Django applications on the web, but the Django documentation doesn't provide any guidance on how to deploy an application built with the framework. That's why I decided to document my learnings and experimentation with this project! This project focuses a lot on the ancillary tools and services that you will likely need to use when building, deploying and operating your Django web application.

## application

This project was originally built as a micro blog. A micro blog (like a very simple version of X) covers many important concepts in web development that are helpful for demo projects: authentication, database modeling, handling media (for posts with images), etc.

Even within the Django framework there are many different permutations of how to build applications (e.g. function-based views vs class-based views, HTMX, Django REST Framework, GraphQL, Django Ninja, Django templates vs React/Vue frontend, etc.)

The simple blog concept is implemented a number of different ways to demonstrate the differences in how to use these different patterns with Django.

The arrival of LLMs prompted me to add a "ChatGPT wrapper" feature to the application as well, and current development efforts are focused on building out more complex LLM graph-based workflows (AI Agents).

## License

See [LICENSE.md](https://github.com/briancaffey/django-step-by-step/blob/main/LICENSE.md).
