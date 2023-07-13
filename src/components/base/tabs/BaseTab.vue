<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  label: {
    type: String,
  },
})
</script>

<template>
  <q-tab :name="name" :icon="icon" :label="label" />
</template>
