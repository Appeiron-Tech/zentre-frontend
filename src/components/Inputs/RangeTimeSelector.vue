<script lang="ts" setup>
import BaseTogglesGroup from '@/components/base/inputs/BaseTogglesGroup.vue'
import { computed } from 'vue'

const props = defineProps(['toggleSelected', 'toggleOptions'])
const emit = defineEmits(['update:toggleSelected'])

const toggleSelected = computed({
  get() {
    return props.toggleSelected
  },
  set(values) {
    emit('update:toggleSelected', values)
  },
})
</script>

<template>
  <div class="row q-gutter-none q-pa-md">
    <div class="col items-end">
      <div class="row justify-end">
        <div class="col self-center text-right">
          <BaseTogglesGroup v-model="toggleSelected" :options="props.toggleOptions" />
        </div>
      </div>
    </div>
  </div>
</template>
