<template>
  <q-page padding>
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
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent } from 'vue';
import useAuth from '../../modules/auth';

export default defineComponent({
  setup() {
    const { login, email, password } = useAuth();
    return { email, password, login }
  },
});
</script>