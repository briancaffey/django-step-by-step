---
home: true

actions:
  - text: Introduction
    link: /intro
    type: primary
heroImage: /images/ublog.png

features:
  - title: Full Stack
    details: This project covers the full technology stack of modern web applications, from frontend to backend to CI/CD and Infrastructure as Code
  - title: Twelve-Factor App
    details: This project adheres to the 12Factor App philosophy
  - title: Best Practices
    details: This project focuses on implementing a simple application with all of the best practices you would see in a healthy, production-ready application
  - title: IaC Rosetta Stone
    details: This project implements the same application architecture using CDK, Terraform and Pulumi
  - title: GitHub Actions
    details: GitHub Actions is used for Continuous Integration and Continuous Delivery, including infrastructure and application pipelines
  - title: AWS ECS Fargate
    details: This project focuses on running containerized Django applications using ECS Fargate, a serverless compute offering from AWS
  - title: FBVs and CBVs
    details: The backend Django app is implemented using Django templates using both functions-based views and class-based views
  - title: DRF and GraphQL
    details: The Django app also implements an API using both REST with DRF and GraphQL with Graphene
  - title: Quasar Framework
    details: A frontend client built with TypeScript, Vue.js, and Quasar Framework consumes the DRF REST API
  - title: Python and TypeScript
    details: Python is used on the backend and TypeScript is used for both the frontend client and infrastructure code
  - title: Load testing
    details: The project uses k6 for simulating traffic which can run locally or using GitHub Actions
  - title: Developer Experience
    details: This project aims to have a simple and understandable developer experience
  - title: compose and venv
    details: Local backend development can be done with both virtual environments and docker compose
  - title: Testing and coverage
    details: pytest is used for backend tests, and test coverage is measured with pytest-cov
  - title: Makefile
    details: All commands for local development are documented in the Makefile


footer: MIT Licensed | Copyright © 2023 Brian Caffey
---

<!-- <div style="text-align: center">
  <Bit/>
</div>

<div class="features">
  <div class="feature">
    <h2>Simplicity First</h2>
    <p>Minimal setup with markdown-centered project structure helps you focus on writing.</p>
  </div>
  <div class="feature">
    <h2>Vue-Powered</h2>
    <p>Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.</p>
  </div>
  <div class="feature">
    <h2>Performant</h2>
    <p>VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.</p>
  </div>
</div> -->

This documentation covers lots of different topics that are related to various aspects of the project. The project aims to provide two things:

- a working example of a sample web application called μblog.
- in-depth technical guides on how to build each part of the application

At a high level, the documentation can be broken down into the following categories:

- Django application set up
- Local development environment

## How to get help

This project is driven by a community of contributors. If you are having trouble with any part of this application, you can get help in a number of ways:

- Join the Discord community: [https://discord.gg/pXzCwc6HFH](https://discord.gg/pXzCwc6HFH)
- Start a discussion on the GitHub project: [https://github.com/briancaffey/django-step-by-step/discussions](https://github.com/briancaffey/django-step-by-step/discussions)
