<template>
  <q-page padding>
    <q-input
      v-model="text"
      filled
      autogrow
    >
    <q-btn color="purple" label="Enter"/>
    </q-input>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup (){

    const search = ref('');

    return { search }
  }
});
</script>

<style scoped>
</style>
