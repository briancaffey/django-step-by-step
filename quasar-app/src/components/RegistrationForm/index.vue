<template>
  <q-card>
    <q-form class="q-pa-md" @submit.prevent="register">
      <q-input
        required
        data-cy="email-input"
        id="email"
        v-model="email"
        type="text"
        label="Email"
        autofocus
      />
      <q-input
        required
        data-cy="password-input"
        id="password"
        type="password"
        v-model="password"
        label="Password"
      />
      <q-card-actions align="right" class="text-primary">
        <q-btn
          data-cy="register-btn"
          id="register-btn"
          flat
          label="Register"
          type="submit"
          v-close-popup
        />
      </q-card-actions>
    </q-form>
  </q-card>
  <div class="q-py-lg text-center">If you don't have an account, <router-link class="router-link" to="/login">sign in.</router-link></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useRegistration from '../../modules/registration';

export default defineComponent({
  setup () {
    const { register, email, password } = useRegistration();

    return { register, email, password }
  }
})
</script>

<style scoped>
.router-link {
  color: grey;
}
</style>