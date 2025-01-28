<template>
  <div>
    {{ appVersion }}
  </div>
</template>

<script setup lang="ts">
const appVersion = useNuxtApp().$appVersion;
definePageMeta({
  layout: 'basic'
})
</script>
