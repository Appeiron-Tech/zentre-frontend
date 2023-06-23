<script lang="ts" setup>
import { ref } from 'vue'
import { minLength } from '@/utils/validators'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
import BaseCardSeparator from '@/components/base/card/BaseCardSeparator.vue'
import BaseDropdown from '@/components/base/inputs/BaseDropdown.vue'
import { DIFFICULT_LEVEL, LANGUAGES } from '@/constants'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const title = ref('')
const description = ref('')
const language = ref(null)
const level = ref(null)
const category = ref(null)
const subCategory = ref(null)
const languageOptions = Object.keys(LANGUAGES).map((lang) => ({
  label: LANGUAGES[lang as keyof typeof LANGUAGES],
  value: lang,
}))
const levelOptions = Object.keys(DIFFICULT_LEVEL).map((level) => ({
  label: t(`DifficultLevel.${level.toLowerCase()}`),
  value: level,
}))
</script>

<template>
  <div>
    <main>
      <div class="col-8 q-pa-md">
        <div class="q-gutter-y-md">
          <BaseCard>
            <BaseCardSection class="q-mx-xl">
              <h2>{{ $t('CourseEdit.pageTitle') }}</h2>
              <h5>{{ $t('CourseEdit.pageDescription') }}</h5>
            </BaseCardSection>
            <BaseCardSeparator />
            <BaseCardSection class="q-mt-lg q-mx-xl">
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
              <div class="row justify-around q-gutter-xl">
                <div class="col"></div>
                <div class="col"></div>
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
              <div class="row justify-around q-gutter-xl">
                <div class="col"></div>
                <div class="col"></div>
              </div>
            </BaseCardSection>
          </BaseCard>
        </div>
      </div>
    </main>
  </div>
</template>
