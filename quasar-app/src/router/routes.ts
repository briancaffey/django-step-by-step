import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'about', component: () => import('pages/About/index.vue') },
      { path: 'profile', component: () => import('pages/Profile/index.vue') },
      { path: '/login', component: () => import('pages/Login/index.vue') },
      {
        path: 'posts',
        component: () => import('pages/Posts/index.vue'),
      },
      {
        path: 'new-post',
        name: 'CreatePost',
        component: () => import('pages/CreatePost/index.vue'),
      },
      {
        path: 'posts/:id',
        name: 'Post',
        component: () => import('pages/PostDetail/index.vue'),
      },

    ],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
