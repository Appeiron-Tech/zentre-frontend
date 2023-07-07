<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ICourse } from '@/models/course/Course.interface'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
import { useRouter } from 'vue-router'
import BaseAvatar from '@/components/base/avatar/BaseAvatar.vue'

defineProps({
  courses: {
    type: Array as PropType<ICourse[]>,
    default: () => [],
  },
})

const router = useRouter()

function redirectEditCourse(courseId: string) {
  router.push({
    name: 'course',
    params: {
      id: courseId,
    },
  })
}
</script>

<template>
  <BaseCard>
    <BaseCardSection class="q-mx-xl">
      <q-list>
        <q-item v-for="course in courses" :key="course.id" clickable v-ripple>
          <q-item-section avatar>
            <BaseAvatar
              image="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?q=10&h=200"
            />
            <!-- <q-avatar>
              <img
                src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?q=10&h=200"
              />
            </q-avatar> -->
          </q-item-section>
          <q-item-section class="q-pl-md">
            <q-item-label lines="1">
              <span class="text-weight-medium">{{ course.title }}</span>
              <span class="text-grey-8"> - {{ course.duration }} {{ course.durationUnit }}</span>
            </q-item-label>
            <q-item-label caption>{{ course.description }}</q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
              <span class="cursor-pointer">{{ course.category }} - {{ course.subCategory }}</span>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="edit"
                @click="redirectEditCourse(course.id)"
              />
              <q-btn size="12px" flat dense round icon="more_vert" />
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </BaseCardSection>
  </BaseCard>
</template>
