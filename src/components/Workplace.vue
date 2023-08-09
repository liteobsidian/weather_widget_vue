<template>
  <div class='container'>
    <h2 class='mt-md'>My pure realization</h2>
    <div class="grid-container mt-md">
      <div class='card' v-for='i in 2'>I'm card №{{i}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onBeforeMount} from 'vue'
import { fetchWeather } from '@/api'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:loading'])
const locations = ref([])
const weather = ref([])
const loading = computed({
  get: () => props.loading,
  set: (val: boolean) => emits('update:loading', val)
})

const refreshWeather = async () => {
  try {
    loading.value = true
    weather.value = await fetchWeather('Lipetsk')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
onBeforeMount(() => refreshWeather())
</script>

<style scoped lang="scss">
.mt-md {
  margin-top: 10px
}
.container {
  max-width: 700px;
  margin: 0 auto;
}
.grid-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  /*grid-template-rows: repeat(5, minmax(250px, 1fr));*/
  grid-auto-rows: minmax(250px, 1fr);
}

.card  {
  max-width: 700px;
  padding: 10px;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;
}
</style>
