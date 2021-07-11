<template>
  <q-page padding>
    <div class="q-pa-sm">
      <post v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <q-pagination
      v-model="currentPage"
      :max="Math.ceil(postCount/limit)"
      :max-pages="10"
    />
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineComponent } from 'vue';
import Post from '../../components/Post/index.vue';

import usePosts from '../../modules/posts';

export default defineComponent({
  components: { Post },
  setup () {
    const { getPosts, posts, currentPage, postCount, limit, offset } = usePosts();

    getPosts();

    return { posts, currentPage, postCount, limit, offset }
  }
})
</script>

<style scoped>

</style>