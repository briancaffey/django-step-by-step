<template>
  <q-page padding>
    <div class="q-pa-sm">
      <post v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <q-pagination
      class="justify-center"
      v-model="currentPage"
      :max="Math.ceil(postCount/limit)"
      :max-pages="10"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Post from '../../components/Post/index.vue';

import usePosts from '../../modules/posts';

export default defineComponent({
  components: { Post },
  setup () {
    const { getPosts, posts, currentPage, postCount, limit, offset } = usePosts();

    // doing this to avoid floating promises
    onMounted(async () => {
      await getPosts();
    })

    return { posts, currentPage, postCount, limit, offset }
  }
})
</script>

<style scoped>

</style>