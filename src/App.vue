<template>
  <div v-if='loading' id='loading'>
    <h1>Loading</h1>
  </div>
  <Workplace v-model:loading='loading'/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Workplace from './components/Workplace.vue'

const loading = ref(false)
</script>

<style lang="scss">
#loading {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(256, 256, 256, .5);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*, body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
