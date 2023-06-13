<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import type { Transition } from '../constants/transition.enum'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true,
  },
  transitionFlow: {
    type: String as PropType<Transition>,
  },
  transitionHide: {
    type: String as PropType<Transition>,
  },
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <q-dialog v-model="value" :transition-show="transitionFlow" :transition-hide="transitionHide">
    <slot></slot>
  </q-dialog>
</template>
