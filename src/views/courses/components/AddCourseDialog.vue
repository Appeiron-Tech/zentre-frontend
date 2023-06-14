<script lang="ts" setup>
import BaseBar from '@/components/base/dialog/BaseBar.vue'
import BaseDialog from '@/components/base/dialog/BaseDialog.vue'
import { computed, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const step = ref(1)
const stepsValidation = ref([false, false, false])
const name = ref(null)
const description = ref(null)
const category = ref(null)

function onSubmit() {
  console.log('submit')
  console.log(name.value)
  console.log(description.value)
  console.log(category.value)
}

const validateStep = (inputValue: string, idx: number) => {
  const verified = (inputValue && inputValue.length > 0) || false
  stepsValidation.value[idx] = verified
  return verified
}

const nextStepDisabled = computed(() => {
  return !stepsValidation.value[step.value - 1]
})
</script>

<template>
  <BaseDialog v-model="value">
    <div style="max-width: 700px">
      <BaseBar class="bg-primary text-white" />
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="Title" icon="settings" :done="step > 1">
          For each ad campaign that you create, you can control how much you're
          <q-input
            filled
            v-model="name"
            label="Your name *"
            hint="Name and surname"
            :rules="[(val) => validateStep(val, 0) || 'Please enter a name']"
          />
        </q-step>

        <q-step
          :name="2"
          title="Description"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          An ad group contains one or more ads.
          <q-input
            filled
            v-model="description"
            label="Your age *"
            :rules="[(val) => validateStep(val, 1) || 'Please enter a description']"
          />
        </q-step>

        <q-step :name="3" title="Public" icon="add_comment">
          Try out different ad text to see what brings in the most customers.
          <q-input
            filled
            v-model="category"
            label="Course category *"
            :rules="[(val) => validateStep(val, 2) || 'Please select a category']"
          />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="step < 3"
              :disable="nextStepDisabled"
              @click=";($refs.stepper as any).next()"
              color="primary"
              label="Continue"
            />
            <q-btn
              v-else
              :disable="nextStepDisabled"
              @click="onSubmit"
              color="primary"
              label="Finish"
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
  </BaseDialog>
</template>
