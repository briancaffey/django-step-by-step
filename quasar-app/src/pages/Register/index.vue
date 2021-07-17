<template>
  <q-page padding>
    <registration-form />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RegistrationForm from '../../components/RegistrationForm/index.vue';

export default defineComponent({
  components: { RegistrationForm },
  setup () {


    return {}
  }
})
</script>

<style scoped>

</style>