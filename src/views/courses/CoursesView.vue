<script lang="ts" setup>
import { ref } from 'vue'
import AddCourseSection from './components/AddCourseSection.vue'
import AddCourseDialog from './components/AddCourseDialog.vue'
import ListCourse from './components/ListCourse.vue'
import CourseService from '@/services/course/Course.service'
import SkeletonList from '@/components/skeletons/SkeletonList.vue'
import type { IGetCoursesReq } from '@/services/course/course.interface'
import type { ICourse } from '@/models/course/Course.interface'

const showToggleCourseForm = ref(false)

// API callbacks
const courseService = new CourseService()
const courses = ref<ICourse[]>([] as ICourse[])
const params: IGetCoursesReq = {
  params: {
    category: 'TECH',
  },
}
courseService.getAllCourses(params).then((res) => {
  courses.value = res
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
          <!-- <h3 v-else>There is nothing</h3> -->
          <SkeletonList v-else :items="5" />
        </div>
      </div>
      <AddCourseDialog v-model="showToggleCourseForm" />
    </div>
  </main>
</template>
