<template>
  <div>This is a test...</div>
  <div>
    {{ colorMode.preference }}
    {{ isAuthenticated }}
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
const colorMode = useColorMode();
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
</script>
