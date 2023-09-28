<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import AddCourseSection from './components/AddCourseSection.vue'
import AddCourseDialog from './components/AddCourseDialog.vue'
import ListCourse from './components/ListCourse.vue'
import CourseService from '@/services/course/Course.service'
import SkeletonList from '@/components/skeletons/SkeletonList.vue'
import type { ICourse } from '@/models/course/Course.interface'
import { useAuthStore } from '@/stores/auth.store'

const showToggleCourseForm = ref(false)
const userStore = useAuthStore()

// API callbacks
const courseService = new CourseService()
const courses = ref<ICourse[]>([] as ICourse[])
const user = userStore.getUser

onMounted(async () => {
  courses.value = await courseService.getCourses(user.centredId)
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
      <AddCourseDialog v-model="showToggleCourseForm" :centred-id="user.centredId" />
    </div>
  </main>
</template>
