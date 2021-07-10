<template>
    <q-page padding>
        <q-card>
          <q-card-section>
            <q-card-title>
                <div  class="text-h4">
                  User Profile
                </div>
            </q-card-title>
          </q-card-section>
          <q-card-section>
              {{ email }}
          </q-card-section>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useProfile from '../../modules/profile';

export default defineComponent({
    setup () {
        const { email, userId } = useProfile();


        return { email, userId }
    }
})
</script>

<style scoped>

</style>