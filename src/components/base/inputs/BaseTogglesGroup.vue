<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps(['modelValues', 'options'])
const emit = defineEmits(['update:modelValues'])

const modelValues = computed({
  get() {
    return props.modelValues
  },
  set(values) {
    emit('update:modelValues', values)
  },
})
</script>

<template>
  <q-btn-toggle
    v-model="modelValues"
    class="q-mr-sm"
    color="white"
    toggle-color="accent"
    text-color="accent"
    no-caps
    rounded
    :options="props.options"
  />
</template>
