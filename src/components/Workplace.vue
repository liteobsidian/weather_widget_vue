<template>
  <div class='container'>
    <h2 class='mt-md'>Weather</h2>
    <div class="grid-container mt-md" v-if='!showSettings'>
      <Card class='card' v-for='(card, idx) in weather' :model-value='card' :idx='idx' @toggle-settings='toggleSettings'/>
    </div>
    <Settings v-else @toggle-settings='toggleSettings' @update='init'/>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import {fetchLocate, fetchWeather} from '@/api'
import Card from './Card.vue'
import Settings from './Settings.vue'
import {LocationsInterface} from '@/interfaces/locations.interface'
import {WeatherInterface} from '@/interfaces/weather.interface'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['update:loading'])
const locations = ref<Array<LocationsInterface>>([])
const weather = ref<Array<WeatherInterface>>([])
const showSettings = ref(false)
const loading = computed({
  get: () => props.loading,
  set: (val: boolean) => emits('update:loading', val)
})

const refreshWeather = async () => {
  try {
    loading.value = true
    const promises: Array<Promise<WeatherInterface>> = []
    locations.value.forEach(el => promises.push(fetchWeather(el.city, el.country)))
    const data = await Promise.allSettled(promises)
    const result = (data.filter(
        (res) => res.status === "fulfilled"
    ) as PromiseFulfilledResult<WeatherInterface>[] | undefined);
    if (result) weather.value = result.map(el => el.value)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
const toggleSettings = () => {
  showSettings.value = !showSettings.value
}
const updateLocations = () => {
  locations.value = JSON.parse(<string>localStorage.getItem('locations'))
}
const init = async () => {
  const locationsFromStorage = JSON.parse(<string>localStorage.getItem('locations'))
  if (locationsFromStorage?.length) {
    updateLocations()
    await refreshWeather()
    return
  }
  try {
    loading.value = true
    const currentLocation = await fetchLocate()
    localStorage.setItem('locations', JSON.stringify([{country: currentLocation.country_name, city: currentLocation.city}]))
    locations.value = [{ country: currentLocation.country_name, city: currentLocation.city }]
    await refreshWeather()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
onBeforeMount(() => {
  init()
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
