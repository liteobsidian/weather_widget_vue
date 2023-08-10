<template>
  <div>
    <div class='card_top-row'>
      <span class='text-h5'>{{modelValue.name}}</span>
      <v-btn density='compact' variant="text" icon="fa fa-cog" v-if='idx === 0' @click='emits("toggle-settings")' />
      <div v-else></div>
    </div>
    <div class='text-h2'>{{modelValue.main?.temp}}°</div>
  </div>
</template>

<script setup lang='ts'>
defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  idx: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(['toggle-settings'])
</script>

<style scoped lang='scss'>
.card_top-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
</style>