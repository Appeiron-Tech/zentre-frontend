<script lang="ts" setup>
defineProps({
  image: {
    type: String,
  },
})
</script>

<template>
  <q-avatar>
    <img :src="image" />
  </q-avatar>
</template>
