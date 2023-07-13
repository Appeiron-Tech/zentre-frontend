<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(modelValue) {
    emit('update:modelValue', modelValue)
  },
})
</script>
<template>
  <q-tabs v-model="modelValue">
    <slot></slot>
  </q-tabs>
</template>
