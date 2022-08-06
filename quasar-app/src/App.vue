<template>
  <router-view id="q-app" />
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useAuth from './modules/auth';

export default defineComponent({
  name: 'App',
  setup() {
    const { refreshToken } = useAuth();

    // try to get a new access token when the app starts
    onMounted(async (): Promise<void> => {
      await refreshToken(true);
    });
  },
});
</script>
