<script lang="ts" setup>
import { ref } from 'vue'
import AddCourseSection from './components/AddCourseSection.vue'
import AddCourseDialog from './components/AddCourseDialog.vue'
import ListCourse from './components/ListCourse.vue'

const showToggleCourseForm = ref(false)

// API callbacks
const courses = ref([
  {
    id: 'courseId',
    centredId: 'centredId',
    title: 'Course Title',
    description: 'Course Description',
    category: 'category',
    subCategory: 'subCategory',
    price: 0.0,
    currency: 'currency',
    duration: 0,
    durationUnit: 'durationUnit',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  {
    id: 'courseId2',
    centredId: 'centredId2',
    title: 'Course Title2',
    description: 'Course Description2',
    category: 'category',
    subCategory: 'subCategory',
    price: 0.0,
    currency: 'currency',
    duration: 0,
    durationUnit: 'durationUnit',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
])

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
          <AddCourseSection @toggle-course-form="toggleCourseForm" />
          <ListCourse :courses="courses" />
        </div>
      </div>

      <AddCourseDialog v-model="showToggleCourseForm" />
    </main>
  </div>
</template>
