<script lang="ts" setup>
defineProps(['propClass'])
</script>

<template>
  <q-card-actions :class="propClass">
    <slot></slot>
  </q-card-actions>
</template>
