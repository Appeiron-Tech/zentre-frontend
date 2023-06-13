<script lang="ts" setup>
const props = defineProps({
  class: String,
})
</script>

<template>
  <q-bar :class="props.class">
    <slot name="icons"></slot>
    <slot name="title"></slot>
    <q-space />
    <q-btn dense flat icon="close" v-close-popup>
      <q-tooltip class="bg-primary text-white">Close</q-tooltip>
    </q-btn>
  </q-bar>
</template>
