<template>
  <div class="q-pa-sm">
    <router-link class="link" :to="{ name: 'Post', params: { id: post.id } }" >
      <q-card class="m-4">
        <q-card-section v-if="post.image">
        <img
            style="max-height: 200px; max-width: 200px; display:block; margin: auto;"
            :src="post.image"
            :alt="post.body"
            v-if="post.image"
        >
        </q-card-section>
        <q-card-section>
          <div class="text-body1">
              {{ post.body }}
          </div>
          <br/>
          <div>
          <span v-if="post.created_by">
              posted by <strong>{{ post.created_by.email }}</strong>
          </span>
          <span v-else><em>posted anonymously</em>
          </span> on
          <span> {{ formatDate(post.modified_on) }}</span>
          </div>

          <q-icon @click.prevent="togglePostLike(post.id)" :name="post.liked ? 'favorite' : 'favorite_border'" color="red" />
         {{ post.like_count }}
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
