<template>
  <q-page padding>
    <div class="q-pa-sm">
      <post :post="post" />
    </div>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */


import { defineComponent } from 'vue'
import Post from '../../components/Post/index.vue';
import { useRoute} from 'vue-router';
import { usePost } from '../../modules/posts';

export default defineComponent({
  components: { Post },
  setup () {
    const { post, getPost } = usePost();
    const route = useRoute();
    console.log(route.params);
    const postId = route.params.id;

    // is there an easier way to do this?
    // route.params.id is of type <string | string[]>
    if (typeof postId === 'string') {
      const id = Number(postId);
      getPost(id);
    }


    return { post, getPost }
  }
})
</script>

<style scoped>

</style>