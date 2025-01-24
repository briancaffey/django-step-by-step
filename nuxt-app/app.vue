<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>

<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useAuth } from '@/composables/useAuth'
import { useProfile } from '@/composables/useProfile';
await useAuth();
const {fetchProfile } = useProfile();
await fetchProfile();
</script>

