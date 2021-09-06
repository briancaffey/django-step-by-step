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
        <q-toolbar-title>
          <router-link style="color: white; text-decoration: none" to="/"
            >μblog</router-link
          >
        </q-toolbar-title>
        <q-toggle color="white" v-model="darkMode" @click="toggleDarkMode" />
        <q-btn-group v-if="isAuthenticated">
          <q-btn
            id="logout-btn"
            color="white"
            text-color="black"
            label="Logout"
            @click.prevent="logout"
          />
        </q-btn-group>
        <q-btn-group v-else>
          <q-btn
            id="login-btn"
            color="white"
            text-color="black"
            label="Login"
            type="submit"
            to="/login"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="fit row wrap justify-center items-start content-start">
        <img src="ublog.png" alt="Quasar" style="max-width: 150px;" class="q-ma-md q-my-lg"/>
        </div>
        <nav-link
          v-for="link in linksList"
          :key="link.link"
          :title="link.title"
          :caption="link.caption"
          :link="link.link"
          :icon="link.icon"
        />
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
          :duration="250"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from '../components/EssentialLink.vue';
import NavLink from '../components/NavLink/index.vue';
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
    link: '/new-post',
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
];

const essentialLinks = [
  {
    title: 'Documentation',
    caption: 'Project Documentation',
    icon: 'description',
    link: 'https://briancaffey.github.io/django-step-by-step/',
  },
  {
    title: 'GitHub',
    caption: 'View this project on GitHub',
    icon: 'code',
    link: 'https://github.com/briancaffey/django-step-by-step/',
  },
];

import { defineComponent, ref } from 'vue';
import useDarkMode from '../modules/darkMode';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    NavLink,
  },

  setup() {
    const { isAuthenticated, logout } = useAuth();
    const { email } = useProfile();
    const leftDrawerOpen = ref(false);
    const { darkMode, toggleDarkMode } = useDarkMode();

    return {
      linksList,
      isAuthenticated,
      toggleDarkMode,
      darkMode,
      email,
      logout,
      essentialLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style scoped>
.router-link {
  color: white;
  text-decoration: none;
}
</style>
