<template>
  <q-page padding>
    <div class="text-center q-pa-md q-pa-lg">
      <div class="text-h2 ">
        Welcome to μblog!!!
      </div>

      <div class="text-subtitle1 q-pa-md">
        μblog is a reference application built with Django and Vue.js. It is a simple microblogging application.
      </div>
      <div class="q-pa-md row items-start justify-center ">
        <!-- center button that links to all technologies -->
        <q-btn to="/technologies" color="primary" class="q-ma-sm">All technologies</q-btn>
        <q-btn to="/new-post" color="info" class="q-ma-sm">Write a post</q-btn>
        <q-btn to="/posts" color="purple" class="q-ma-sm">View all posts</q-btn>
      </div>
    </div>
    <div class="text-h5 q-pa-md text-center">
      μblog is built with open-source technologies
    </div>
    <div class="q-pa-md row wrap justify-center items-start content-center text-center">
      <tech-card v-for="item in coreTechnologies" :key="item.title" :item="item" />
    </div>
    <div class="q-pa-md row items-start justify-center">
      <!-- center button that links to all technologies -->
      <q-btn to="/technologies" color="primary">All technologies</q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import TechCard from '../TechCard.vue';
import TechCard from '../components/TechCard/index.vue';
import { coreTechnologies } from '../data/technologies';

export default defineComponent({
  components: {
    TechCard,
  },
  name: 'PageIndex',
  data() {
    return {
      coreTechnologies,
    }
  },
});
</script>
