<template>
  <q-page padding>
    <div class="text-center q-pa-md q-pa-lg text-h5">
      Technologies used in this project ({{ technologiesList.length }}/{{ technologies.length }})
    </div>
    <div class="row justify-center items-center" >
      <q-input
        outlined
        v-model="search"
        placeholder="Search technologies..."
      />
    </div>

    <div v-if="technologiesList.length > 0">
      <div class="q-pa-md row wrap justify-center items-start content-center text-center">
        <tech-card v-for="item in technologiesList" :key="item.title" :item="item" />
      </div>
    </div>
    <div v-else class="q-pa-xl">
      <div class="text-center">No technologies found match "{{ search }}"</div>
    </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { allTechnologies } from '../../data/technologies';
import TechCard from '../../components/TechCard/index.vue';

export default defineComponent({
  components: {
    TechCard,
  },
  setup () {

    const search = ref('');

    let technologies = allTechnologies;



    const technologiesList = computed(() => {
      if (search.value) {
        return technologies.filter(tech => {
          return (
            tech.title.toLowerCase().includes(search.value.toLowerCase()) ||
            tech.description.toLowerCase().includes(search.value.toLowerCase())
          )
        });
      } else {
        return technologies;
      }
    });


    return { technologies, technologiesList, search }
  }
})
</script>

<style scoped>

</style>