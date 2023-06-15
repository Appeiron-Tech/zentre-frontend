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
const title = ref(null)
const description = ref(null)
const category = ref(null)

function onSubmit() {
  console.log('submit')
  console.log(title.value)
  console.log(description.value)
  console.log(category.value)
}

const validateStep = (inputValue: string, idx: number, maxLength = 100) => {
  const verified = (inputValue && inputValue.length > 0 && inputValue.length <= maxLength) || false
  stepsValidation.value[idx] = verified
  return verified
}

const nextStepDisabled = computed(() => {
  return !stepsValidation.value[step.value - 1]
})
</script>

<template>
  <BaseDialog v-model="value">
    <div style="max-width: 750px">
      <BaseBar class="bg-primary text-white" />
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="Título" icon="settings" :done="step > 1">
          <div class="center">
            <h3>¿Qué tal un título provisional?</h3>
            <h5>
              No pasa nada si ahora no se te ocurre un buen título. Puedes cambiarlo más adelante.
            </h5>
            <q-input
              filled
              v-model="title"
              label="Ejemplo: Aprende a programar en Python desde cero"
              :rules="[(val) => validateStep(val, 0, 60) || 'Necesitas un título']"
            />
          </div>
        </q-step>

        <q-step :name="2" title="Descripción" icon="description" :done="step > 2">
          <div class="center">
            <h3>¿Alguna idea para la descripción del curso?</h3>
            <h5>
              Si no estás seguro de si la descripción es adecuada, podrás cambiarla más tarde.
            </h5>
            <q-input
              filled
              v-model="description"
              label="Ejemplo: En este curso aprenderás desde lo básico hasta lo más avanzado de ... "
              :rules="[(val) => validateStep(val, 1, 100) || 'Please enter a description']"
            />
          </div>
        </q-step>

        <q-step :name="3" title="Categoría" icon="category">
          <div class="center">
            <h3>¿Qué categoría se ajusta mejor a los conocimientos que vas a compartir?</h3>
            <h5>Si no está seguro de cuál es la categoría adecuada, puede cambiarla más tarde.</h5>
            <q-input
              filled
              v-model="category"
              label="Course category *"
              :rules="[(val) => validateStep(val, 2) || 'Please select a category']"
            />
          </div>
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

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>
