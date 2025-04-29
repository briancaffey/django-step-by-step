<template>
  <NuxtLayout>
    <NuxtPage class="dark-mode dark" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useProfile } from '@/composables/useProfile';
await useAuth();
const {fetchProfile } = useProfile();
await fetchProfile();
</script>

