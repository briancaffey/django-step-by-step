<template>
  <q-page padding>
    <div class="q-pa-sm" v-if="!loadingPosts">
      <post v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <div v-else class="content-center text-center">
      <q-spinner-oval
        class="q-ma-xl"
        color="primary"
        size="2em"
      />
    </div>
    <div v-if="errorLoadingPosts" class="content-center text-center">
      Unable to load posts.
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
    const {
      getPosts,
      posts,
      currentPage,
      postCount,
      limit,
      offset,
      loadingPosts,
      errorLoadingPosts,
    } = usePosts();

    // doing this to avoid floating promises
    // rather then just writing:
    // await getPosts();
    onMounted(async () => {
      await getPosts();
    })

    return { posts, currentPage, postCount, limit, offset, loadingPosts, errorLoadingPosts }
  }
})
</script>

<style scoped>

</style>
