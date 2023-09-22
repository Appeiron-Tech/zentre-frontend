<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import AddCourseSection from './components/AddCourseSection.vue'
import AddCourseDialog from './components/AddCourseDialog.vue'
import ListCourse from './components/ListCourse.vue'
import CourseService from '@/services/course/Course.service'
import SkeletonList from '@/components/skeletons/SkeletonList.vue'
import type { ICourse } from '@/models/course/Course.interface'
import { useCentredStore } from '@/stores/centred.store'
import { isObjectEmpty } from '@/utils/validators'

const showToggleCourseForm = ref(false)

// API callbacks
const courseService = new CourseService()
const centredStore = useCentredStore()
const courses = ref<ICourse[]>([] as ICourse[])
const params = {
  params: {
    category: 'TECH',
  },
}

onMounted(async () => {
  if (isObjectEmpty(centredStore.centred)) {
    await centredStore.fetch('6498a94e213a7fc800781e1a')
  }
  courses.value = await courseService.getAllCourses(centredStore.centred.id, params)
})

function toggleCourseForm() {
  showToggleCourseForm.value = !showToggleCourseForm.value
}
</script>

<template>
  <main>
    <div>
      <div class="col-9 q-pa-md">
        <div class="q-gutter-y-md">
          <h1>Courses View</h1>
          <AddCourseSection @toggle-course-form="toggleCourseForm" />
          <ListCourse v-if="courses.length" :courses="courses" />
          <SkeletonList v-else :items="5" />
        </div>
      </div>
      <AddCourseDialog v-model="showToggleCourseForm" />
    </div>
  </main>
</template>
