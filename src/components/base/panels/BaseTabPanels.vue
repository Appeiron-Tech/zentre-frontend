<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
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
  <q-tab-panels
    v-model="modelValue"
    animated
    swipeable
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <slot></slot>
  </q-tab-panels>
</template>
