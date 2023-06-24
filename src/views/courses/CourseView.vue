<script lang="ts" setup>
import { computed, ref } from 'vue'
import { minLength } from '@/utils/validators'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
import BaseCardSeparator from '@/components/base/card/BaseCardSeparator.vue'
import BaseDropdown from '@/components/base/inputs/BaseDropdown.vue'
import { COURSES_CATEGORY, COURSES_SUBCATEGORY, DIFFICULT_LEVEL, LANGUAGES } from '@/constants'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const title = ref(null)
const description = ref(null)
const language = ref(null)
const level = ref(null)
const category = ref('')
const subCategory = ref(null)
const price = ref(0.0)
const languageOptions = Object.keys(LANGUAGES).map((lang) => ({
  label: LANGUAGES[lang as keyof typeof LANGUAGES],
  value: lang,
}))
const levelOptions = Object.keys(DIFFICULT_LEVEL).map((level) => ({
  label: t(`DifficultLevel.${level.toLowerCase()}`),
  value: level,
}))
const categoryOptions = Object.keys(COURSES_CATEGORY).map((course) => ({
  label: t(`CreateCourses.categoryOptions.${course.toLowerCase()}`),
  value: course,
}))
const subCategoryOptions = computed(() => {
  if (category.value) {
    const subCategoryValues =
      COURSES_SUBCATEGORY[category.value as keyof typeof COURSES_SUBCATEGORY]
    return Object.keys(subCategoryValues).map((subCategory) => ({
      label: t(`SubCategory.${category.value.toLowerCase()}.${subCategory.toLowerCase()}`),
      value: subCategory,
    }))
  }
  return []
})
</script>

<template>
  <div>
    <main>
      <div class="col-8 q-pa-lg">
        <div class="q-gutter-y-md">
          <BaseCard>
            <BaseCardSection class="q-mx-xl">
              <h2>{{ $t('CourseEdit.pageTitle') }}</h2>
              <h5>{{ $t('CourseEdit.pageDescription') }}</h5>
            </BaseCardSection>
            <BaseCardSeparator />
            <BaseCardSection class="q-mx-xl">
              <span class="sectionTitle">{{ t('CourseEdit.basicSection') }}</span>
            </BaseCardSection>
            <BaseCardSection class="q-mx-xl">
              <q-input
                outlined
                v-model="title"
                :label="$t('CourseEdit.titleLabel')"
                :hint="$t('CourseEdit.titleHint')"
                :rules="[(val) => minLength(val, 60) || $t('CreateCourses.titleError')]"
              />
              <div class="q-mt-lg">
                <q-input
                  outlined
                  v-model="description"
                  :label="$t('CourseEdit.descriptionLabel')"
                  :hint="$t('CourseEdit.descriptionHint')"
                  :rules="[(val) => minLength(val, 60) || $t('CreateCourses.descError')]"
                />
              </div>
            </BaseCardSection>
            <BaseCardSection class="q-mt-lg q-mx-xl">
              <div class="row justify-around q-gutter-xl">
                <div class="col">
                  <BaseDropdown
                    v-model="language"
                    isOptionMap
                    :options="languageOptions"
                    :label="$t('CourseEdit.languageLabel')"
                    :hint="$t('CourseEdit.languageHint')"
                  />
                </div>
                <div class="col">
                  <BaseDropdown
                    v-model="level"
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
                    v-model="category"
                    isOptionMap
                    :options="categoryOptions"
                    :label="$t('CourseEdit.categoryLabel')"
                    :hint="$t('CourseEdit.categoryHint')"
                  />
                </div>
                <div class="col">
                  <BaseDropdown
                    v-model="subCategory"
                    isOptionMap
                    :options="subCategoryOptions"
                    :label="$t('CourseEdit.subcategoryLabel')"
                    :hint="$t('CourseEdit.subcategoryHint')"
                  />
                </div>
              </div>
            </BaseCardSection>
            <BaseCardSection class="q-mt-md q-mx-xl">
              <span class="sectionTitle">{{ t('CourseEdit.priceSection') }}</span>
            </BaseCardSection>
            <BaseCardSection class="q-mx-xl">
              <div class="row justify-around q-gutter-xl">
                <div class="col">
                  <q-input
                    outlined
                    v-model="price"
                    type="number"
                    :label="$t('CourseEdit.priceLabel')"
                    :hint="$t('CourseEdit.priceHint')"
                  />
                </div>
                <div class="col">
                  <div v-if="price <= 0" class="q-pt-sm">
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
</style>
