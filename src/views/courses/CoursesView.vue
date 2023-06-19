<script lang="ts" setup>
import { ref } from 'vue'
import AddSection from './components/AddSection.vue'
import AddCourseDialog from './components/AddCourseDialog.vue'

const showToggleCourseForm = ref(false)

function toggleCourseForm() {
  showToggleCourseForm.value = !showToggleCourseForm.value
}
</script>

<template>
  <div>
    <main>
      <div class="col-9 q-pa-md">
        <div class="q-gutter-y-md">
          <h1>Courses View</h1>
          <AddSection @toggle-course-form="toggleCourseForm" />
        </div>
      </div>

      <AddCourseDialog v-model="showToggleCourseForm" />
    </main>
  </div>
</template>
