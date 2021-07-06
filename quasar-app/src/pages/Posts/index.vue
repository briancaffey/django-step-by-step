<template>
  <div>
    <div class="text-grey-8">Posts</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
  setup() {
    api.get(`/api/drf/fbv/posts/`);
  },
});
</script>



<style scoped>
</style>