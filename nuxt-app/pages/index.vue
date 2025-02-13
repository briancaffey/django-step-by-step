<template>
  <h1 class="text-xl">Welcome</h1>
  <div>
    <div>
      Color mode: {{ colorMode.preference }}
    </div>
    <div>
      User authenticated? {{ isAuthenticated }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
const colorMode = useColorMode();
const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);

useHead({
  title: 'App',
  meta: [
    { name: 'description', content: 'An app' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})

</script>
