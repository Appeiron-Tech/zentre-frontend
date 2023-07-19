<script lang="ts" setup>
defineProps({
  image: {
    type: String,
  },
  size: {
    type: String,
  },
  label: {
    type: String,
  },
})
</script>

<template>
  <q-avatar :size="size">
    <q-img :src="image">
      <div v-if="label" class="absolute-top text-subtitle1 text-center">{{ label }}</div>
    </q-img>
  </q-avatar>
</template>
