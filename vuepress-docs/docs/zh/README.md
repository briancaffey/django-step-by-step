---
home: true

actions:
  - text: 简介
    link: /intro
    type: primary
heroImage: /images/ublog.png

features:
  - title: 全栈
    details: 该项目涵盖了现代 Web 应用程序的完整技术栈，从前端到后端再到 CI/CD 和基础架构即代码
  - title: 十二因素应用程序
    details: 本项目秉承12Factor App理念
  - title: 最佳实践
    details: 该项目侧重于实现一个简单的应用程序，其中包含您将在健康的、生产就绪的应用程序中看到的所有最佳实践
  - title: IaC Rosetta Stone
    details: 本项目使用CDK、Terraform和Pulumi实现相同的应用架构
  - title: GitHub 操作
    details: GitHub Actions 用于持续集成和持续交付，包括基础设施和应用程序管道
  - title: AWS ECS Fargate
    details: 该项目侧重于使用 ECS Fargate 运行容器化的 Django 应用程序，ECS Fargate 是 AWS 的无服务器计算产品
  - title: FBV 和 CBV
    details: 后端 Django 应用程序是使用基于函数的视图和基于类的视图的 Django 模板实现的
  - title: DRF 和 GraphQL
    details: Django 应用程序还使用带有 DRF 的 REST 和带有 Graphene 的 GraphQL 来实现 API
  - title: 类星体框架
    details: 使用 TypeScript、Vue.js 和 Quasar Framework 构建的前端客户端使用 DRF REST API
  - title: Python 和 TypeScript
    details: 后端使用 Python，前端客户端和基础设施代码均使用 TypeScript
  - title: 负载测试
    details: 项目使用k6模拟流量，可以在本地运行，也可以使用GitHub Actions
  - title: 开发者体验
    details: 该项目旨在提供简单易懂的开发人员体验
  - title: 撰写和 venv
    details: 本地后端开发既可以用虚拟环境也可以用docker compose来完成
  - title: 测试和覆盖
    details: pytest用于后端测试，测试覆盖率用pytest-cov测量


footer: MIT Licensed | Copyright © 2023 Brian Caffey
---

本文档涵盖了许多与项目的各个方面相关的不同主题。该项目旨在提供两件事：

- 名为 μblog 的示例 Web 应用程序的工作示例。
- 关于如何构建应用程序每个部分的深入技术指南

在高层次上，文档可以分为以下几类：

- Django 应用程序设置
- 本地开发环境

## 如何获得帮助

该项目由贡献者社区推动。如果您在使用此应用程序的任何部分时遇到问题，您可以通过多种方式获得帮助：

- 加入 Discord 社区：[https://discord.gg/pXzCwc6HFH](https://discord.gg/pXzCwc6HFH)
- 在 GitHub 项目上开始讨论：[https://github.com/briancaffey/django-step-by-step/discussions](https://github.com/briancaffey/django-step-by-step/discussions)
