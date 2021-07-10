<template>
  <div class="q-pa-sm">
    <router-link class="link" :to="{ name: 'Post', params: { id: post.id } }" >
      <q-card class="m-4">
        <q-card-section v-if="post.image">
        <img
            style="max-height: 200px; margin: auto;"
            :src="`http://localhost:8000${post.image}`"
            :alt="post.body"
            v-if="post.image"
        >
        </q-card-section>
        <q-card-section>
        <div class="text-body1">
            {{ post.body }}
        <div v-if="post.created_by">
            {{ post.created_by.email }}
        </div>
        <div v-else><em>anonymous</em>
        </div>
        <div>{{ formatDate(post.modified_on) }}</div>
        <div>{{ post.id }}</div>
        <q-icon @click.prevent="togglePostLike(post.id)" :name="post.liked ? 'favorite' : 'favorite_border'" color="red" />
          | {{ post.like_count }}
        </div>
        </q-card-section>
        <!-- TODO: add a section for edit/delete buttons -->
        <!-- <q-card-section v-if="isOwnPost">
          <q-btn :to="`/posts/${post.id}/edit/`" color="primary">Edit</q-btn>
          <q-btn :to="`/posts/${post.id}/delete/`" color="red">Delete</q-btn>
        </q-card-section> -->

      </q-card>
    </router-link>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { defineComponent } from 'vue';
import { usePost } from '../../modules/posts';

export default defineComponent({
  props: {
    post: Object
  },
  methods: {
    formatDate(dateString:string): string {
      const date = new Date(dateString);
      // Then specify how you want your dates to be formatted
      return new Intl.DateTimeFormat('default').format(date);
    }
  },
  setup() {
    const { togglePostLike } = usePost();
    return { togglePostLike  };
  }
});
</script>



<style scoped>
.link {
  text-decoration: none;
  color: black;
}
</style>