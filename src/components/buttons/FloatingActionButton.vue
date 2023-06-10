<script lang="ts" setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <q-btn fab :icon="icon" :color="color" @click="$emit('onClick')" />
</template>
