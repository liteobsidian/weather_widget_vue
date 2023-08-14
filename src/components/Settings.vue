<template>
  <v-card class='mx-auto'>
    <v-card-item>
      <div class='card_top-row'>
        <span class='text-h5'>Settings</span>
        <v-btn density='compact' variant='text' icon='fa fa-times' @click='emits("toggle-settings")'/>
      </div>
      <div class='drop-zone' @dragenter.prevent @dragover.prevent>
        <div
            v-for='(item, index) in locations'
            :key='index'
            class='drag-el'
            draggable='true'
            @dragstart='startDrag($event, item, index)'
            @drop='onDrop($event, index)'
        >
          <v-icon density='compact' variant='text' color='grey' icon='fas fa-bars'></v-icon>
          {{item.city}}, {{item.country}}
          <v-btn density='compact' size='small' variant='text' icon='fas fa-trash' @click='deleteLocation(index)'></v-btn>
        </div>
      </div>
      <v-form :fast-fail='true' @submit.prevent='addLocation'>
        <v-combobox
            v-model="country"
            :rules="[() => !!country || 'This field is required']"
            :items="countries"
            label="Country"
            placeholder="Select..."
            required
        ></v-combobox>
        <v-combobox
            v-model="city"
            :rules="[() => !!city || 'This field is required']"
            :items="cities"
            label="City"
            placeholder="Select..."
            :loading='cityLoading'
            required
        ></v-combobox>
        <v-btn type='submit' :block='true' class='mt-2' :disabled='!country || !city'>Add</v-btn>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script setup lang='ts'>
import {onMounted, ref, watchEffect} from 'vue'
import countries from '@/assets/countries'
import {fetchCities} from '@/api'
import {LocationsInterface} from '@/interfaces/locations.interface'

const emits = defineEmits(['toggle-settings', 'update'])
const city = ref<string>('')
const cityLoading = ref(false)
const country = ref<string>('')
const cities = ref<Array<string>>([])

const locations = ref<LocationsInterface[]>([])

const updateLocations = () => {
  locations.value = JSON.parse(<string>localStorage.getItem('locations'))
}
const addLocation = () => {
  locations.value.push({city: city.value, country: country.value})
  localStorage.setItem('locations', JSON.stringify(locations.value))
  emits('update')
}
const deleteLocation = (index: number) => {
  locations.value.splice(index, 1)
  localStorage.setItem('locations', JSON.stringify(locations.value))
  emits('update')
}
const getCities = async (country: string) => {
  if (!country) return
  try {
    cityLoading.value = true
    const resp = await fetchCities(country)
    if (resp.data) cities.value = resp.data
  } catch (e) {
    console.error(e)
  } finally {
    cityLoading.value = false
  }
}

const startDrag = (event: any, item: LocationsInterface, id: number) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', id)
}
const onDrop = (event: any, index: number) => {
  const itemId = JSON.parse(event.dataTransfer.getData('itemId'))
  if (itemId === index) return
  const el = locations.value[itemId]
  locations.value.splice(itemId, 1)
  locations.value.splice(index, 0, el)
  localStorage.setItem('locations', JSON.stringify(locations.value))
  updateLocations()
  emits('update')
}
watchEffect(() => getCities(country.value))
onMounted(() => updateLocations())
</script>

<style scoped lang='scss'>
.card_top-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.drop-zone {
  width: 100%;
  margin: 50px auto;
  background-color: #ececec;
  padding: 10px;
  min-height: 10px;
  border-radius: 5px;
}

.drag-el {
  cursor: grab;
  background-color: #fff;
  color: #2f2f2f;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.drag-el:nth-last-of-type(1) {
  margin-bottom: 0
}

[draggable="true"] {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>
