<template>
  <q-page padding>
    <div class="text-h5 text-center q-pa-md">Debugging</div>
    <div>
      <q-btn @click.prevent="triggerException">Trigger Exception</q-btn>
      <q-btn @click.prevent="emailAdmins">Email Admins</q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDebug from '../../modules/debug';

export default defineComponent({
  setup () {

    const { triggerException, emailAdmins } = useDebug();

    return {
      triggerException, emailAdmins
    }
  }
})
</script>

<style scoped>

</style>
