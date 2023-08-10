<template>
  <v-card class='mx-auto'>
    <v-card-item>
      <div class='card_top-row'>
        <span class='text-h5'>Settings</span>
        <v-btn density='compact' variant='text' icon='fa fa-times' @click='emits("toggle-settings")'/>
      </div>
      <v-form fast-fail @submit='addCountry'>
        <v-text-field v-model='country' label='Country' :rules='countryRules'></v-text-field>
        <v-text-field v-model='city' label='City' :rules='cityRules'></v-text-field>
        <v-btn type='submit' block class='mt-2'>Add</v-btn>
      </v-form>
    </v-card-item>
  </v-card>
</template>

<script setup lang='ts'>
import {ref} from 'vue'

const emits = defineEmits(['toggle-settings'])
const city = ref('')
const country = ref('')
const countryRules = [
  (value: string) => {
    if (/[^0-9]/.test(value)) return true

    return 'Country can not contain digits.'
  },
]
const cityRules = [
  (value: string) => {
    if (/[^0-9]/.test(value)) return true

    return 'Country can not contain digits.'
  },
]
const addCountry = () => {
  const locations = JSON.parse(<string>localStorage.getItem('locations'))
  locations.push({city: city.value, country: country.value})
  localStorage.setItem('locations', JSON.stringify(locations))
  alert('Location added!')
}
</script>

<style scoped lang='scss'>
.card_top-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
</style>