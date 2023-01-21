---
next: /topics/twelve-factor-app
---

# 项目介绍

这是一个 Django 参考项目，展示了如何使用多种工具和方法以及最佳实践和简明示例来开发和部署 Django 应用程序。

## 太长未读

该项目使用普通 Django 基于函数的视图和基于类的视图以及 DRF 函数和基于类的视图实现了一个简单的博客应用程序。还有一个使用 GraphQL 的相同应用程序的实现。该应用程序涉及一个简单的数据模型，包括用户、带有文本和图像的帖子以及帖子点赞。详细介绍了使用虚拟环境和 docker 进行本地开发，包括有关如何在不同操作系统（Linux、Intel Mac、M1 Mac、Windows、WSL）上运行应用程序的指南。该项目有 100% 的测试覆盖率，并使用 Cypress 进行全面的端到端测试。该项目可以部署到多个生产环境，包括 AWS。在 Elastic Container Service (ECS) 上部署到 AWS 环境由 CDK 和 [我专门为在 AWS 上部署容器化 Django 项目编写的 CDK 构造库](https://github.com/briancaffey/django-cdk) 提供支持。

这个项目最初是作为一个参考或示例项目设计的，当我需要回忆常见的模式、语法和常用的代码片段时，可以使用它。我试图仔细记录开发过程的每个部分，作为想要了解如何从头开始构建和部署该项目的人的指南。请参阅 [/STEP_BY_STEP.md](STEP_BY_STEP.md) 以获取对项目的完整解释，一步一步。本文的最后一部分介绍了 12 Factor App 原则以及该项目如何符合这些原则。

这个项目是开源的，是 Django 和 Python 的新手，欢迎创建问题和拉取请求。

## 核心应用

该项目实现了一个名为 μblog 的简单微博应用程序。以下是 μblog 的一些核心功能：

- 任何人（包括未经身份验证的用户）都可以发布带有文本和可选图像的帖子
- 用户可以注册通过单击电子邮件中的链接激活的帐户
- 登录用户可以喜欢帖子
- 登录用户可以编辑和删除自己的帖子

＃＃ 执行

μblog 的核心微博应用以 5 种不同的方式实现：

- 基于 Django 函数的视图
- 基于 Django 类的视图
- Django REST Framework 基于函数的视图
- Django REST Framework 基于类的视图
- 带有石墨烯的 GraphQL

每个实现都使用 OpenAPI (Swagger UI) 进行测试和记录。 GraphiQL 为 GraphQL API 公开，其中包括查询和变更的文档。

Django 模板和 Bootstrap 用于基于函数和类的 Django 视图。 Vue.js 用于使用 AJAX（使用 axios）实现点赞按钮。

## 本地开发

该项目主要关注设置开发环境的过程。该项目已经过测试和开发：

- Ubuntu 20.04
- macOS 11.4（苹果硅）
- Windows 10（WSL + Docker 桌面）

Windows 10 PowerShell 开发环境仍然是 WIP。以下是本地开发环境的一些重要特性：

### Makefile

Makefile 包含在要记录的项目的根目录中。该文件有助于记录本地开发环境和部署过程的每个步骤。

### Python依赖

这个项目的 Python 依赖是用 poetry 管理的。诗歌依赖和开发依赖在 pyproject.toml 中指定。这些依赖项被导出到两个文件：

- `requirements.txt`：这仅包含项目在生产环境中运行所需的依赖项
- `requirements_dev.txt`：这包含在生产环境中运行和本地开发所需的所有依赖项

### 使用虚拟环境进行开发

该应用程序可以在本地使用虚拟环境进行开发。这需要在本地启动 postgres 和 redis 服务。或者，可以使用在 localhost 上公开服务的 docker-compose 文件启动 postgres、redis 和其他支持服务。

### 使用 docker 开发

Docker 是开发和部署应用程序（包括 Django）的流行选择。 docker-compose 可用于在容器中运行应用程序和依赖服务。有关详细信息，请参阅根目录中的“docker-compose.yml”。

docker-compose 文件包含以下服务：

- postgres：Postgres 服务
-redis：Redis 服务
- pgadmin：Postgres 管理服务
- redis-commander：Redis 管理服务
- 后端：主要的 Django Web 应用程序
- celery_worker：处理默认队列的celery worker
- beat：按计划对任务进行排队的 celery 进程
- mailhog：用于测试的本地 SMTP 服务器

该应用程序还可以在本地 Kubernetes 集群中本地运行。这是通过 minikube 实现的。 cdk8s 和 pulumi 都用于展示如何从代码 (TypeScript) 动态生成 kubernetes 清单文件并将其部署到集群。

### 使用 Cypress 进行端到端测试

Cypress 用于端到端测试，可以针对 docker-compose 开发环境在本地运行。为了在 e2e 测试中测试用户注册和电子邮件验证，MailHog 和 MailHog API 用于从 Django 应用程序发送的电子邮件中检索电子邮件确认链接。

＃＃ 持续集成

每次推送到“dev”分支时，GitHub Actions 管道都会运行静态代码检查和单元测试。

持续集成检查所有单元测试是否通过以及代码格式是否正确。单元测试在包含相关服务（postgres 和 redis）的模拟环境中运行 Python 代码。

## 部署

本项目侧重于使用 AWS ECS 将应用程序部署在不同的环境（按需测试环境、预生产环境和生产环境）。

### 亚马逊云服务器

ECS 是我在 AWS 上运行容器化 Web 应用程序的首选方式。为了帮助记录在 ECS 上部署 Django 应用程序的最佳实践，我编写了一个可重用的 CDK 构造库，用于处理典型部署场景的基础设施配置。这个项目可以在 [这里](https://github.com/briancaffey/django-cdk) 找到。

库中包含的 Django ECS 构造创建以下 AWS 资源：

- VPC（公共、私有和隔离子网、NAT 网关、路由表、Internet 网关等）
- 用于存储静态文件和媒体文件的 S3 存储桶
- ECS集群（一组ECS资源）
- 应用程序各个组件的 ECS 任务和服务（web、celery worker、管理命令和任务）
- 从我们的 Django 应用程序代码和指定的 Dockerfile 构建的 docker 镜像
- 应用负载均衡器
- 可以附加到终止 SSL/TLS 的 Application Load Balancer 的 TLS 证书
- 指向 Application Load Balancer 公共 DNS 名称的 Route53 DNS 记录
- 作为 Django 应用程序的数据库服务器的 AWS RDS Postgres 数据库实例
- 一个单节点 AWS ElastiCache Redis 集群，为 celery worker 提供缓存和消息代理
- 允许无状态应用层与 Postgres 数据库和 Redis 集群通信的安全组
- 使用 ECS 任务为 Django 应用程序自动迁移数据库

Django ECS 构造需要一些输入，包括：

- Django 应用程序代码的路径
- 定义用于 Django 应用程序的主图像的 Dockerfile 的路径
- Route53 中的域名，将用于在您的帐户中生成 DNS 记录
- 可选择提供要附加到 Application Load Balancer 的 ACM 证书的 ARN
- 用作 Web 服务命令的字符串列表
- 用作芹菜工人命令的字符串列表
- 用作 celery beat 进程命令的字符串列表


该项目可以从命令行（使用“make cdk-deploy”）或从 CI/CD 管道部署 ECS。 GitHub Actions 和 GitLab CI 都包含将应用程序部署到 AWS ECS 的管道阶段。

附加 [ECS Exec](https://aws.amazon.com/blogs/containers/new-using-amazon-ecs-exec-access-your-containers-fargate-ec2/) 用于运行管理命令和打开 shell在 Fargate 上运行的容器内部。

## 这个项目是开源的，并且是麻省理工学院许可的

请参阅 [LICENSE.md](https://github.com/briancaffey/django-step-by-step/blob/main/LICENSE.md)。
