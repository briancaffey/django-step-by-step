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
        text: 'Quasar',
        link: '/topics/quasar/',
      },
      {
        text: 'Netlify',
        link: '/topics/netlify/',
      },
      {
        text: 'Docker Compose',
        link: '/topics/docker-compose/',
      },
      {
        text: 'JWT Authentication',
        link: '/topics/jwt-authentication/',
      },
      {
        text: 'VuePress',
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
          },
          {
            text: 'GitLab CI',
            link: '/guide/ci-cd/gitlab-ci/',
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
        link: '/deploy/overview/',
      },
      {
        text: 'AWS',
        link: '/deploy/aws/',
      },
      {
        text: 'Raspberry Pi',
        link: '/deploy/raspi/',
      },
      {
        text: 'DigitalOcean',
        link: '/deploy/digital-ocean/',
      },
      {
        text: 'Heroku',
        link: '/deploy/heroku/',
      },
    ],
  },
]