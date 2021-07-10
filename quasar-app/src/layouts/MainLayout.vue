<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> μblog </q-toolbar-title>
        <q-toggle color="white" v-model="darkMode" />
        <q-btn
          v-if="isAuthenticated"
          id="logout-btn"
          flat
          label="Logout"
          @click.prevent="logout"
        />
        <q-btn
          v-else
          id="login-btn"
          flat
          label="Login"
          type="submit"
          to="/login"
        />
        {{ email }}
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue';
import useAuth from '../modules/auth';
import useProfile from '../modules/profile';

const linksList = [
  {
    title: 'Home',
    caption: 'μblog Home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'New Post',
    caption: 'new μblog post',
    icon: 'edit',
    link: 'new-post',
  },
  {
    title: 'Posts',
    caption: 'μblog posts',
    icon: 'dynamic_feed',
    link: '/posts',
  },
  {
    title: 'User Profile',
    caption: 'Your μblog profile',
    icon: 'person',
    link: '/profile',
  },
  {
    title: 'About',
    caption: 'About μblog',
    icon: 'info',
    link: '/about',
  },
  {
    title: 'Django Admin',
    caption: 'μblog Administration',
    icon: 'admin_panel_settings',
    link: 'http://localhost:8000/my-admin-portal/',
  },
  {
    title: 'GitHub',
    caption: 'View this project on GitHub',
    icon: 'code',
    link: 'https://github.com/briancaffey/django-step-by-step/',
  },
];

import { defineComponent, ref, computed } from 'vue';
import useDarkMode from '../modules/darkMode';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const { isAuthenticated, logout } = useAuth();
    const { email } = useProfile();
    const leftDrawerOpen = ref(false);
    const { darkMode } = useDarkMode();




    return {
      isAuthenticated,
      darkMode,
      email,
      logout,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
