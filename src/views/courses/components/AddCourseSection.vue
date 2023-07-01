<script lang="ts" setup>
import FloatingActionButton from '@/components/buttons/FloatingActionButton.vue'
</script>

<template>
  <div class="column items-end">
    <FloatingActionButton icon="add" color="green" @on-click="$emit('toggleCourseForm')" />
  </div>
</template>
