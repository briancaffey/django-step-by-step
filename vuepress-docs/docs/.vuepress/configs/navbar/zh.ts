import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '简介',
    link: '/zh/intro',
  },
  {
    text: '主题',
    link: '/topics',
    children: [
      {
        text: 'Twelve-Factor App',
        link: '/topics/twelve-factor-app',
      },
      {
        text: 'Django Application',
        link: '/topics/django/',
      },
      {
        text: 'Quasar Application',
        link: '/topics/quasar/',
      },
      {
        text: 'Docker Compose',
        link: '/topics/docker-compose/',
      },
      {
        text: 'Authentication',
        link: '/topics/jwt-authentication/',
      },
      {
        text: 'VuePress Documentation',
        link: '/topics/vuepress/',
      }
    ],
  },
  {
    text: '指南',
    link: '/guide/',
    children: [
      {
        text: '分步指南',
        link: '/guide/step-by-step/',
      },
      {
        text: 'CI/CD',
        children: [
          {
            text: 'GitHub Actions',
            link: '/guide/ci-cd/github-actions/',
          }
        ]
      }
    ],
  },
  {
    text: '部署',
    link: '/deploy/',
    children: [
      {
        text: '概述',
        link: '/deploy/aws/',
        children: [
          {
            link: '/deploy/aws/cdk',
            text: 'CDK',
            ariaLabel: 'CDK',
          },
          {
            link: '/deploy/aws/terraform',
            text: 'Terraform'
          },
          {
            link: '/deploy/aws/pulumi',
            text: 'Pulumi'
          }
        ],
      },
    ],
  },

]
