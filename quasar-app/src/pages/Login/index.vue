<template>
  <q-page padding>
    <login-form />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../../components/LoginForm/index.vue';

export default defineComponent({
  components: { LoginForm },
  setup () {


    return {}
  }
})
</script>

<style scoped>

</style>