<template>
  <div>
    <main>
      <div class="row q-gutter-none q-mb-md">
        <div class="col items-end">
          <div class="row justify-end">
            <div class="col self-center text-right">
              <q-btn-toggle
                v-model="period"
                class="q-mr-sm"
                dense
                toggle-color="secondary"
                no-caps
                :options="periodList"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Body -->
      <div class="q-mb-md"></div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { DEFAULT_PERIODS } from '@/constants'
import { ref } from 'vue'

const period = ref()
const periodList = DEFAULT_PERIODS.map((period) => {
  // return { label: t(period.label), value: period.value }
  return { label: period.label.split('-')[1], value: period.value }
})
</script>

<style>
@media (min-width: 200px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
