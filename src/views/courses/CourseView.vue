<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import { minLength, maxLength } from '@/utils/validators'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
import BaseCardSeparator from '@/components/base/card/BaseCardSeparator.vue'
import BaseDropdown from '@/components/base/inputs/BaseDropdown.vue'
import SkeletonPost from '@/components/skeletons/SkeletonPost.vue'
import {
  COURSES_CATEGORY,
  COURSES_SUBCATEGORY,
  CURRENCIES,
  DIFFICULT_LEVEL,
  LANGUAGES,
  TIME_DURATION,
} from '@/constants'
import { useI18n } from 'vue-i18n'
import type { ICourse } from '@/models/course/Course.interface'
import CourseService from '@/services/course/Course.service'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const course = ref<ICourse | null>(null)

const languageOptions = Object.keys(LANGUAGES).map((lang) => ({
  label: LANGUAGES[lang as keyof typeof LANGUAGES],
  value: lang,
}))
const levelOptions = Object.keys(DIFFICULT_LEVEL).map((level) => ({
  label: t(`DifficultLevel.${level.toLowerCase()}`),
  value: level,
}))
const currencyOptions = Object.keys(CURRENCIES).map((currency) => ({
  label: CURRENCIES[currency as keyof typeof CURRENCIES],
  value: currency,
}))
const durationOptions = Object.keys(TIME_DURATION).map((duration) => ({
  label: t(`UnitDuration.${duration.toLowerCase()}`),
  value: duration,
}))
const categoryOptions = Object.keys(COURSES_CATEGORY).map((course) => ({
  label: t(`CreateCourses.categoryOptions.${course.toLowerCase()}`),
  value: course,
}))
const subCategoryOptions = computed(() => {
  if (course.value?.category) {
    const subCategoryValues =
      COURSES_SUBCATEGORY[course.value.category as keyof typeof COURSES_SUBCATEGORY]
    return Object.keys(subCategoryValues).map((subCategory) => ({
      label: t(`SubCategory.${course.value?.category.toLowerCase()}.${subCategory.toLowerCase()}`),
      value: subCategory,
    }))
  }
  return []
})

const courseService = new CourseService()

onBeforeMount(async () => {
  const courseId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  course.value = await courseService.getCourse(courseId)
})

async function onSubmit() {
  if (course.value) {
    await courseService.updateCourse(course.value)
    router.go(0)
  }
}

const courseHasChange = ref(false)
watch(
  () => course.value,
  (newValue, oldValue) => {
    if (oldValue !== null) {
      courseHasChange.value = true
    }
  },
  { deep: true },
)
</script>

<template>
  <div>
    <main>
      <div class="col-8 q-pa-lg">
        <div class="q-gutter-y-md">
          <BaseCard v-if="!course">
            <BaseCardSection class="q-mx-xl">
              <SkeletonPost />
            </BaseCardSection>
          </BaseCard>
          <BaseCard v-else>
            <BaseCardSection class="q-mx-xl">
              <h2>{{ $t('CourseEdit.pageTitle') }}</h2>
              <h5>{{ $t('CourseEdit.pageDescription') }}</h5>
            </BaseCardSection>
            <BaseCardSeparator />
            <BaseCardSection class="q-mx-xl">
              <div class="row justify-between">
                <div class="col">
                  <span class="sectionTitle">{{ t('CourseEdit.basicSection') }}</span>
                </div>
                <div class="col-2 contentRight">
                  <q-btn
                    size="lg"
                    v-if="courseHasChange"
                    @click="onSubmit"
                    color="primary"
                    :label="$t('CourseEdit.update')"
                  />
                </div>
              </div>
            </BaseCardSection>
            <BaseCardSection class="q-mx-xl">
              <q-input
                outlined
                v-model="course.title"
                :label="$t('CourseEdit.titleLabel')"
                :hint="$t('CourseEdit.titleHint')"
                :rules="[(val) => maxLength(val, 60) || $t('CreateCourses.titleError')]"
              />
              <div class="q-mt-lg">
                <q-input
                  outlined
                  v-model="course.description"
                  :label="$t('CourseEdit.descriptionLabel')"
                  :hint="$t('CourseEdit.descriptionHint')"
                  :rules="[(val) => minLength(val, 50) || $t('CreateCourses.descError')]"
                />
              </div>
            </BaseCardSection>
            <BaseCardSection class="q-mt-lg q-mx-xl">
              <div class="row justify-around q-gutter-xl">
                <div class="col">
                  <BaseDropdown
                    v-model="course.language"
                    isOptionMap
                    :options="languageOptions"
                    :label="$t('CourseEdit.languageLabel')"
                    :hint="$t('CourseEdit.languageHint')"
                  />
                </div>
                <div class="col">
                  <BaseDropdown
                    v-model="course.level"
                    isOptionMap
                    :options="levelOptions"
                    :label="$t('CourseEdit.levelLabel')"
                    :hint="$t('CourseEdit.levelHint')"
                  />
                </div>
              </div>
              <div class="row justify-around q-gutter-xl q-pt-lg">
                <div class="col">
                  <BaseDropdown
                    v-model="course.category"
                    isOptionMap
                    :options="categoryOptions"
                    :label="$t('CourseEdit.categoryLabel')"
                    :hint="$t('CourseEdit.categoryHint')"
                  />
                </div>
                <div class="col">
                  <BaseDropdown
                    v-model="course.subCategory"
                    isOptionMap
                    :options="subCategoryOptions"
                    :label="$t('CourseEdit.subcategoryLabel')"
                    :hint="$t('CourseEdit.subcategoryHint')"
                  />
                </div>
              </div>
              <div class="row justify-around q-gutter-xl q-pt-lg">
                <div class="col-3">
                  <q-input
                    outlined
                    v-model="course.duration"
                    type="number"
                    :label="$t('CourseEdit.durationLabel')"
                    :hint="$t('CourseEdit.durationHint')"
                  />
                </div>
                <div class="col-2">
                  <BaseDropdown
                    v-model="course.durationUnit"
                    isOptionMap
                    :options="durationOptions"
                    :label="$t('CourseEdit.durationUnitLabel')"
                  />
                </div>
                <div class="col">
                  <q-space />
                </div>
              </div>
            </BaseCardSection>
            <BaseCardSection class="q-mt-md q-mx-xl">
              <span class="sectionTitle">{{ t('CourseEdit.priceSection') }}</span>
            </BaseCardSection>
            <BaseCardSection class="q-mx-xl">
              <div class="row justify-around q-gutter-xl">
                <div class="col-2">
                  <BaseDropdown
                    v-model="course.currency"
                    isOptionMap
                    :options="currencyOptions"
                    :label="$t('CourseEdit.currencyLabel')"
                  />
                </div>
                <div class="col-3">
                  <q-input
                    outlined
                    v-model="course.price"
                    type="number"
                    :label="$t('CourseEdit.priceLabel')"
                    :hint="$t('CourseEdit.priceHint')"
                  />
                </div>
                <div class="col">
                  <div v-if="!course.price || course.price <= 0" class="q-pt-sm">
                    <q-chip outline color="green" text-color="white" icon="sell"> Free </q-chip>
                  </div>
                  <q-space v-else />
                </div>
              </div>
            </BaseCardSection>
          </BaseCard>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.sectionTitle {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
}

.contentRight {
  display: flex;
  justify-content: flex-end;
}
</style>
