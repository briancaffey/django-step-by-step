---
next: /topics/docker-compose
prev: /topics/django
---

# Nuxt.js application

[[toc]]

## Why Nuxt?

Nuxt.js is a Vue.js framework that has support for server side rendering. It consumes API endpoints from the Django application.

## Differences compared to Single Page Applications

Single Page Applications (SPAs) is another popular way to build web applications. These sites are simple to deploy as static websites, but they cannot easily handle complex SEO or link previews (Open Graph tags). Nuxt with SSR runs in a container and generates the first request as a full HTML page, and then subsequent navigation behaves similar to an SPA.

## shadcn/ui

The Nuxt.js app uses `shadcn/ui` for UI components.

