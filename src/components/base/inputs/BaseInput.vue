<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: String,
  icon: String,
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
  <q-input filled v-model="modelValue" :label="label">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<!-- <q-input v-model="contact.emails[0]" filled type="email" label="Email de contacto">
  <template v-slot:prepend>
    <q-icon name="mail" />
  </template>
</q-input> -->
