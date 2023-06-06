<script lang="ts" setup>
import type { PropType } from 'vue'

interface ISurvey {
  rate: number
  comment: string | null
  createdAt?: Date
}

defineProps({
  topComments: {
    type: Array as PropType<ISurvey[]>,
    default: () => [],
  },
})
</script>

<template>
  <q-list>
    <q-item v-for="(topComment, idx) in topComments" :key="idx">
      <q-item-section>
        <q-item-label>{{ topComment.createdAt?.toISOString() }}</q-item-label>
        <q-item-label caption>{{ topComment.comment }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>2 min ago</q-item-label>
        <div class="text-orange">
          <q-rating
            v-model="topComment.rate"
            :size="14 + topComment.rate * 5.4 + 'px'"
            icon="star_border"
            icon-selected="star"
            color="secondary"
            readonly
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>
