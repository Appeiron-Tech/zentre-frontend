<script lang="ts" setup>
defineProps(['propClass'])
</script>

<template>
  <q-card-section :class="propClass">
    <slot></slot>
  </q-card-section>
</template>
