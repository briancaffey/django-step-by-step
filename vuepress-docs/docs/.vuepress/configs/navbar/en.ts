import type { NavbarConfig } from '@vuepress/theme-default'

export const en: NavbarConfig = [
  {
    text: 'Introduction',
    link: '/intro',
  },
  {
    text: 'Topics',
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
    text: 'Guide',
    link: '/guide/',
    children: [
      {
        text: 'Step by step guide',
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
    text: 'Deploy',
    link: '/deploy/',
    children: [
      {
        text: 'Overview',
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
