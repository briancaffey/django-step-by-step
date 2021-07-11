<template>
  <div>
    <q-card style="margin: auto;" class="my-card">
      <q-card-section class="flex-center">
        <img
          style="max-width: 200px; margin: auto;"
          :src="item.image"
        >
      </q-card-section>

      <q-card-section>
        <div class="text-h6" style="width: 250px;">{{ item.title }}</div>
        <div class="text-subtitle2" style="width: 250px;">{{ item.description }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ item.detail }}
      </q-card-section>
      <q-card-section>
        <q-btn class="q-btn" tag="a" :href="item.documentationLink">Documentation</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    item: Object,
  },
  setup(props) {
    return { item: props.item }
  }
})
</script>

<style scoped>

</style>