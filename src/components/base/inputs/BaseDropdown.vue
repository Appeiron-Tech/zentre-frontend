<script lang="ts" setup>
import type { ValidationRule } from 'quasar'
import { computed, type PropType } from 'vue'

const props = defineProps({
  modelValue: {
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
  },
  rules: {
    type: Array as PropType<ValidationRule[]>,
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
  <q-select
    square
    filled
    v-model="modelValue"
    :options="options"
    :label="label"
    :rules="rules"
    emit-value
  />
</template>
