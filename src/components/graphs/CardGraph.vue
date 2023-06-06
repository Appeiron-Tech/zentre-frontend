<script lang="ts" setup>
defineProps({
  selected: Boolean,
  title: String,
  value: String,
  description: String,
})
defineEmits(['onClick'])
</script>

<template>
  <q-card rounded @click="$emit('onClick')" :class="selected ? 'mainCardSelected' : 'mainCard'">
    <q-card-section horizontal>
      <q-card-section class="col-3 q-pt-xs q-pr-xs">
        <div class="text-overline">{{ title }}:</div>
        <div class="text-h5 q-mt-sm q-mb-xs">
          <strong>{{ value }}</strong>
        </div>
        <div class="text-caption text-grey">{{ description }}</div>
      </q-card-section>
      <q-card-section class="flex flex-center q-pr-md">
        <div class="chart-container">
          <slot></slot>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  background-color: white;
  width: 16vw;
  height: 12vh;
}
</style>
