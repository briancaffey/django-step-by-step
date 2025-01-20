<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
await useAuth();
</script>

<style>
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
