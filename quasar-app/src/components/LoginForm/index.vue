<template>
  <div class="q-page q-layout-padding flex justify-center items-start">
    <div style="min-width: 350px;">
      <div class="text-h5 text-center q-pa-md">Login</div>
      <q-card>
        <q-form class="q-pa-md" @submit.prevent="login">
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
                data-cy="login-btn"
                id="login-btn"
                flat
                label="Login"
                type="submit"
                v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
      <div class="q-py-lg text-center">Don't have an account? <router-link class="router-link" to="/register">Sign up</router-link></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useAuth from '../../modules/auth';

export default defineComponent({
  setup() {
    const { login, email, password } = useAuth();
    return { email, password, login }
  },
});
</script>

<style scoped>
.router-link {
  color: grey;
}
</style>
