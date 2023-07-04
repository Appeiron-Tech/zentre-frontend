<script lang="ts" setup>
defineProps({
  items: {
    type: Number,
    default: 1,
  },
})

function randomWidth() {
  return Math.floor(Math.random() * 100) + '%'
}
</script>

<template>
  <div class="q-pa-md">
    <q-item v-for="item in items" :key="item">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" :width="randomWidth()" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" :width="randomWidth()" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>
