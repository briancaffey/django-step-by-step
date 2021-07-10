<template>
    <q-card class="m-4">
      <q-card-section>
        <div class="text-h5">New Post</div>
      </q-card-section>
      <q-card-section class="q-pa-md">
        <form class="q-gutter-md">
          <q-input
            autofocus
            data-cy="post-textarea"
            type="textarea"
            v-model="body"
            label="Write your post here..."
            outlined
            required
          ></q-input>
          <q-file
            outlined v-model="image"
            label="Add an image to your post"
          />
          <div>
            <q-btn data-cy="post-submit-btn" class="mr-4" color="primary" @click="createPost"> submit </q-btn>&nbsp;
            <q-btn data-cy="post-reset-btn" @click="reset" color="warning"> reset </q-btn>
          </div>
        </form>
      </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useCreatePost from '../../modules/createPost';


export default defineComponent({
  setup () {
    const { body, image, createPost, reset } = useCreatePost();

    return { body, image, createPost, reset }
  }
})
</script>

<style scoped>

</style>