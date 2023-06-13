<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const step = ref(1)

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
  <q-dialog v-model="value" transition-show="flip-down" transition-hide="flip-up">
    <div style="max-width: 700px">
      <q-bar class="bg-primary text-white">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-primary text-white">Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="Title" icon="settings" :done="step > 1">
          For each ad campaign that you create, you can control how much you're willing to spend on
          clicks and conversions, which networks and geographical locations you want your ads to
          show on, and more.
        </q-step>

        <q-step
          :name="2"
          title="Description"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          An ad group contains one or more ads which target a shared set of keywords.
        </q-step>

        <q-step :name="3" title="Public" icon="add_comment">
          Try out different ad text to see what brings in the most customers, and learn how to
          enhance your ads using features like ad extensions. If you run into any problems with your
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click=";($refs.stepper as any).next()"
              color="primary"
              :label="step === 4 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click=";($refs.stepper as any).previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-dialog>
</template>
