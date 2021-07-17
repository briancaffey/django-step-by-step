<template>
  <q-page padding>
    <div v-if="!accountActivated">Activating your account...</div>
    <div v-else>Your account has been activated. Please <q-btn to="/login">Login</q-btn></div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useActivation from '../../modules/activate';

export default defineComponent({
  setup () {
    const { verify, accountActivated, accountActivationError } = useActivation();

    onMounted(async () => {
      await verify();
    });


    return { accountActivated, accountActivationError }
  }
})
</script>

<style scoped>

</style>