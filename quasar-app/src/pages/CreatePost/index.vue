<template>
  <q-page padding>
    <post-form />
  </q-page>
</template>

<script lang="ts">
// TODO: why does this import need to index.vue?
// It should work with the parent directory
import PostForm from '../../components/PostForm/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    PostForm
  }
})
</script>

<style scoped>

</style>
