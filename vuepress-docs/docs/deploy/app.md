---
prev: /deploy/aws

head:
  - - meta
    - name: description
      content: How to update the version of the application with GitHub Actions
  - - link
    - rel: canonical
      href: https://briancaffey.github.io/django-step-by-step/deploy/app
---

# Updating the application version

This page describes the process of updating the backend or frontend applications to a new version. The processes for updating the backend Django application and the frontend Nuxt.js application are different, but the logic for updating both of these applications is contained in the same GitHub Action workflow.

## Backend

Updating the backend application is a two-step process.

- Step 1: create a new task definition for the `pre-backend-update` task using the new backend application version (e.g. `v1.2.3`), publish this new task definition and then run the `pre-backend-update` task. This task applies migrations and runs the `collectstatic` command as well as any other Django management commands that are called in the `pre-backend-update` command

::: warning
Database migrations included in the NEW version of code should be backward-compatible with the application code in the OLD version of code.
:::

- Step 2: Create new task definitions for the backend ECS services (`gunicorn` webserver, celery worker and celery beat scheduler)

## Frontend

Updating the frontend requires updating the frontend task definition with the new frontend application version (e.g. `v1.2.3`) and then updating the service with the new task definition.

You can provide an version tag for the backend app, the frontend app or both. The GitHub Actions pipeline will first update the backend and then update the frontend.
