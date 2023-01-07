import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '简介',
    link: '/intro',
  },
  {
    text: 'Topics',
    link: '/topics',
  },
  {
    text: '指南',
    link: '/guide/',
    children: [
      {
        text: '准备开始',
        link: '/guide/step-by-step/',
      }
    ],
  },
  {
    text: 'Deploy',
    link: '/deploy/',
    children: [
      {
        text: 'AWS',
        link: '/deploy/aws/',
      },
    ],
  },
]
