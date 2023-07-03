<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ICourse } from '@/models/course/Course.interface'

defineProps({
  courses: {
    type: Array as PropType<ICourse[]>,
    default: () => [],
  },
})
</script>

<template>
  <q-list>
    <q-item v-for="course in courses" :key="course.id">
      <q-item-section>
        <q-item-label>{{ course.title }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn color="primary" flat label="Edit" />
        <q-btn color="negative" flat label="Delete" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
