<template>
  <q-page padding>
    <q-card>
      <q-card-section>
      <q-card-title class="text-h4">
        About this project
      </q-card-title>
      </q-card-section>
      <q-card-section>
        This is a Quasar Framework application. It is a frontend application that consumes the μblog API.
      </q-card-section>
      <q-card-section>
        {{ apiUrl }}
      </q-card-section>
    </q-card>
    <q-card v-if="dev" class="q-mt-md">
      <q-card-section>
      <q-card-title class="text-h4">
        Links
      </q-card-title>
      </q-card-section>
      <q-card-section v-for="link in devLinks" :key="link.url">
        <q-btn no-caps type="a" :href="link.url" target="_blank"><pre>{{ link.name }} - {{ link.url }} - {{ link.desc }}</pre></q-btn>
      </q-card-section>
    </q-card>
    <q-card v-else class="q-mt-md">
      <q-card-section>
      <q-card-title class="text-h4">
        Links
      </q-card-title>
      </q-card-section>
      <q-card-section v-for="link in prodLinks" :key="link.url">
        <q-btn no-caps type="a" :href="link.url" target="_blank"><pre>{{ link.name }} - {{ link.url }} - {{ link.desc }}</pre></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {

    const devLinks = [
      {
        name: 'pgadmin',
        desc: 'PostgreSQL Admin',
        url: 'http://localhost:5050'
      },
      {
        name: 'flower',
        desc: 'celery monitoring utility',
        url: 'http://localhost:49555'
      },
      {
        name: 'redis-commander',
        desc: 'UI for inspecting redis',
        url: 'http://localhost:8085'
      },
      {
        name: 'VuePress documentation',
        desc: 'μblog project documentation',
        url: 'http://localhost:8089'
      },
      {
        name: 'mailhog',
        desc: 'local SMTP server for development',
        url: 'http://localhost:8025'
      },
      {
        name: 'django-silk',
        desc: 'request profiler for Django',
        url: 'http://localhost/api/silk/'
      },
      {
        name: 'GraphiQL',
        desc: 'GraphQL IDE',
        url: 'http://localhost/graphql/'
      },
      {
        name: 'DRF Browsable API',
        desc: 'UI for Django REST Framework',
        url: 'http://localhost/api/'
      },
      {
        name: 'coverage',
        desc: 'view backend code coverage (requires running make htmlcov)',
        url: 'http://localhost:8002'
      },
      {
        name: 'Health check',
        desc: 'simple endpoint to check if the API server is running',
        url: 'http://localhost/api/health-check/'
      },
      {
        name: 'Jupyter Notebook',
        desc: 'Jupyter Notebook',
        url: 'http://localhost:8888'
      },
      {
        name: 'Swagger',
        desc: 'Open API specification',
        url: 'http://localhost/api/swagger-ui/'
      },
    ]

    const dev = process.env.NODE_ENV === 'development'

    const prodLinks = [
      {
        name: 'VuePress documentation',
        desc: 'Project documentation',
        url: 'https://briancaffey.github.io/django-step-by-step/'
      }
    ];

    const apiUrl = process.env.API_URL;
    return { apiUrl, devLinks, dev, prodLinks }
  }
})
</script>

<style scoped>

</style>
