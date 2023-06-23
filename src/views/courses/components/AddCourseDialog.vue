<script lang="ts" setup>
import BaseDropdown from '@/components/base/inputs/BaseDropdown.vue'
import BaseDialog from '@/components/base/dialog/BaseDialog.vue'
import { computed, ref } from 'vue'
import BaseBar from '@/components/base/dialog/BaseBar.vue'
import { useI18n } from 'vue-i18n'
import { COURSES_CATEGORY } from '@/constants'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const title = ref(null)
const step = ref(1)
const router = useRouter()

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const stepsValidation = ref([false, false, false])
const description = ref(null)
const category = ref(null)

const categoryOptions = Object.keys(COURSES_CATEGORY).map((course) => ({
  label: t(`CreateCourses.categoryOptions.${course.toLowerCase()}`),
  value: course,
}))

// --------- Computed ----------
const nextStepDisabled = computed(() => {
  return !stepsValidation.value[step.value - 1]
})
// -----------------------------

function onSubmit() {
  console.log('submit')
  console.log(title.value)
  console.log(description.value)
  console.log(category.value)
  router.push({
    name: 'course',
    params: {
      id: 123,
    },
  })
}

const validateStep = (inputValue: string, idx: number, maxLength = 100) => {
  const verified = (inputValue && inputValue.length > 0 && inputValue.length <= maxLength) || false
  stepsValidation.value[idx] = verified
  return verified
}
</script>

<template>
  <BaseDialog v-model="value">
    <div style="max-width: 750px">
      <BaseBar class="bg-primary text-white" />
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step
          :name="1"
          :title="$t('CreateCourses.titleTabTitle')"
          icon="settings"
          :done="step > 1"
        >
          <div class="center">
            <h3>{{ $t('CreateCourses.titleTitle') }}</h3>
            <h5>{{ $t('CreateCourses.titleDescription') }}</h5>
            <q-input
              filled
              v-model="title"
              :label="$t('CreateCourses.titlePlaceholder')"
              :rules="[(val: string) => validateStep(val, 0, 60) || $t('CreateCourses.titleError')]"
            />
          </div>
        </q-step>

        <q-step
          :name="2"
          :title="$t('CreateCourses.descTabTitle')"
          icon="description"
          :done="step > 2"
        >
          <div class="center">
            <h3>{{ $t('CreateCourses.descTitle') }}</h3>
            <h5>
              {{ $t('CreateCourses.descDescription') }}
            </h5>
            <q-input
              filled
              v-model="description"
              :label="$t('CreateCourses.descPlaceholder')"
              :rules="[(val: string) => validateStep(val, 1, 100) || $t('CreateCourses.descError')]"
            />
          </div>
        </q-step>

        <q-step :name="3" :title="$t('CreateCourses.categoryTabTitle')" icon="category">
          <div class="center">
            <h3>{{ $t('CreateCourses.categoryTitle') }}</h3>
            <h5>{{ $t('CreateCourses.categoryDescription') }}</h5>
            <BaseDropdown
              v-model="category"
              isOptionMap
              :options="categoryOptions"
              :label="$t('CreateCourses.categoryPlaceholder')"
              :rules="[(val) => validateStep(val, 2)]"
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
              :label="$t('CreateCourses.continue')"
            />
            <q-btn
              v-else
              :disable="nextStepDisabled"
              @click="onSubmit"
              color="primary"
              :label="$t('CreateCourses.finish')"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click=";($refs.stepper as any).previous()"
              :label="$t('CreateCourses.back')"
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
