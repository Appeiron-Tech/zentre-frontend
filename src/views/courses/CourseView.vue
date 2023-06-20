<script lang="ts" setup>
import { ref } from 'vue'
const title = ref('')
const description = ref('')
</script>

<template>
  <div>
    <main>
      <div class="col-8 q-pa-md">
        <div class="q-gutter-y-md">
          <q-card>
            <q-card-section class="q-mx-xl">
              <h2>{{ $t('CourseEdit.pageTitle') }}</h2>
              <h5>{{ $t('CourseEdit.pageDescription') }}</h5>
            </q-card-section>
            <q-separator inset />
            <q-card-section class="q-mt-lg q-mx-xl">
              <div>
                <q-input
                  outlined
                  v-model="title"
                  :label="$t('CourseEdit.titleLabel')"
                  :hint="$t('CourseEdit.titleHint')"
                  :rules="[
                    (val) =>
                      (val && val.length > 0 && val.length <= 60) || $t('CreateCourses.titleError'),
                  ]"
                />
              </div>
              <div class="q-mt-lg">
                <q-input
                  outlined
                  v-model="description"
                  :label="$t('CourseEdit.descriptionLabel')"
                  :hint="$t('CourseEdit.descriptionHint')"
                  :rules="[
                    (val) =>
                      (val && val.length > 0 && val.length <= 60) || $t('CreateCourses.descError'),
                  ]"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </main>
  </div>
</template>
