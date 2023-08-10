<template>
  <div class='container'>
    <h2 class='mt-md'>My realization</h2>
    <div class="grid-container mt-md" v-if='!showSettings'>
      <Card class='card' v-for='(card, idx) in weather' :model-value='card' :idx='idx' @toggle-settings='toggleSettings'/>
    </div>
    <Settings v-else @toggle-settings='toggleSettings'/>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onBeforeMount} from 'vue'
import { fetchWeather } from '@/api'
import Card from './Card.vue'
import Settings from './Settings.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:loading'])
const locations = ref([{ city: 'Moscow', country: 'RU' }])
const weather = ref([])
const showSettings = ref(false)
const loading = computed({
  get: () => props.loading,
  set: (val: boolean) => emits('update:loading', val)
})

const refreshWeather = async () => {
  try {
    loading.value = true
    const promises: any[] = []
    locations.value.forEach(el => promises.push(fetchWeather(el.city, el.country)))
    const result: any = await Promise.all(promises)
    weather.value = result.map((el: { data: any }) => el.data)
    // const data = await fetchWeather('Lipetsk', 'RU')
    console.log('result', weather.value)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
const toggleSettings = () => {
  showSettings.value = !showSettings.value
}
onBeforeMount(() => {
  locations.value = JSON.parse(<string>localStorage.getItem('locations')) || []
  // localStorage.setItem("locations", JSON.stringify([{ city: 'Lipetsk', country: 'RU' }]))
  refreshWeather()
})
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
  border-radius: 10px;
  box-shadow: 0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;
}
</style>
