<script lang="ts" setup>
defineProps({
  source: {
    type: String,
  },
  label: {
    type: String,
  },
  ratio: {
    type: [String, Number],
  },
})
</script>

<template>
  <q-img :src="source" :ratio="ratio">
    <div v-if="label" class="absolute-top text-subtitle1 text-center">{{ label }}</div>
  </q-img>
</template>
