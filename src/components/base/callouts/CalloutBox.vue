<script setup lang="ts">
defineProps({
  text: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div :class="type">{{ text }}</div>
</template>

<style>
.error {
  position: relative;
  padding: 15px;
  text-align: center;
  background-color: #fbeef0;
  border: 1px solid #b00020;
  color: #b00020;
  border-radius: 5px;
}

.info {
  position: relative;
  padding: 15px;
  text-align: center;
  background-color: #e3f2fd;
  border: 1px solid #29b6f6;
  color: #29b6f6;
  border-radius: 5px;
}
</style>
