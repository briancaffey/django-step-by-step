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
        text: 'Django Application',
        link: '/topics/django',
      },
      {
        text: 'Nuxt Application',
        link: '/topics/nuxt',
      },
      {
        text: 'Docker Compose',
        link: '/topics/docker-compose',
      },
      {
        text: 'VuePress Documentation',
        link: '/topics/vuepress',
      }
    ],
  },
  {
    text: 'Deploy',
    children: [
      {
        link: '/deploy/aws',
        text: 'AWS ECS',
        children: [
          {
            link: '/deploy/aws/terraform',
            text: 'Terraform'
          },
          {
            link: '/deploy/aws/pulumi',
            text: 'Pulumi'
          },
          {
            link: '/deploy/aws/cdk',
            text: 'CDK'
          }
        ]
      },
      {
        text: 'Application Updates',
        link: '/deploy/app',
        children: [
          {
            link: '/deploy/github-actions',
            text: 'GitHub Action'
          }
        ]
      }
    ]
  }
]
