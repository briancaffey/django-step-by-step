<template>
  <div class="justify-center content-center q-ma-sm fit col">
    <q-card class="justify-center content-center">
      <q-card-section class="flex-center">
        <img
          class="image"
          :src="item.image"
        >
      </q-card-section>

      <q-card-section>
        <div class="text-h6" >{{ item.title }}</div>
        <div class="text-subtitle2" >{{ item.description }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none fit" >
        {{ item.detail }}
      </q-card-section>
      <q-card-section>
        <q-btn
          class="q-btn"
          color="white"
          text-color="black"
          tag="a"
          :href="item.documentationLink"
        >
          Documentation
        </q-btn>
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
})
</script>

<style scoped>
.image {
  display: flex;
  justify-content: center;
  max-width: 200px;
  margin: auto;
  max-height: 200px;
}
</style>