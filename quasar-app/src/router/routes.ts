import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'about', component: () => import('pages/About/index.vue') },
      { path: 'debug', component: () => import('pages/Debug/index.vue') },
      { path: 'profile', component: () => import('pages/Profile/index.vue') },
      { path: '/technologies', component: () => import('pages/Technologies/index.vue') },
      { path: '/login', component: () => import('pages/Login/index.vue') },
      { path: '/register', component: () => import('pages/Register/index.vue') },
      { path: '/activate/:uidb64/:token', component: () => import('pages/ActivateAccount/index.vue') },
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
