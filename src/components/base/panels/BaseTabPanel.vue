<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <q-tab-panel :name="name">
    <slot></slot>
  </q-tab-panel>
</template>
