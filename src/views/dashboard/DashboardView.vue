<template>
  <div>
    <main>
      <div class="row q-gutter-none q-pa-md">
        <div class="col items-end">
          <div class="row justify-end">
            <div class="col self-center text-right">
              <q-btn-toggle
                v-model="period"
                class="q-mr-sm"
                color="white"
                toggle-color="accent"
                text-color="accent"
                no-caps
                rounded
                :options="periodList"
                @update:model-value="updateDashboard"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Body -->
      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <!-- <q-tabs v-model="tab" align="center"> -->
          <div class="row">
            <template v-for="(tabOption, index) in tabOptions" :key="index">
              <div class="col">
                <q-card
                  rounded
                  @click="updateGraph(tabOption.name)"
                  tag="div"
                  :class="tab === tabOption.name ? 'mainCardSelected' : 'mainCard'"
                >
                  <q-card-section horizontal>
                    <!-- <q-card-section class="q-pt-xs" style="width: 50%; padding-left: 8px; padding-right: 0px"> -->
                    <q-card-section class="q-pt-xs q-pr-xs">
                      <div class="text-overline">Average:</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        <strong>{{ tabOption.avg }}</strong>
                      </div>
                      <div class="text-caption text-grey">{{ tabOption.name }}</div>
                    </q-card-section>
                    <!-- <q-card-section class="col-5 flex flex-center"> -->
                    <q-card-section class="col-6 flex flex-center q-pr-xs">
                      <div class="rounded-borders" style="width: 200px; background-color: white">
                        <canvas :id="tabOption.canvas"></canvas>
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
              <q-separator v-if="index < 2" spaced vertical inset />
            </template>
          </div>
          <div style="width: 800px; background-color: white"><canvas id="mainCanvas"></canvas></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { DEFAULT_PERIODS } from '@/constants'
import { getEndOfDate } from '@/utils/time'
import { onMounted, ref } from 'vue'
import type { IPreviousRange } from './interfaces/IPreviousRange'
import Chart from 'chart.js/auto'

const periodList = DEFAULT_PERIODS.map((period) => {
  return { label: period.label.split('-')[1], value: period.value, before: period.before }
})
const period = ref(periodList[0].value)
const tabOptions = ref([
  { name: 'satisfaction', canvas: 'satisfactionCanvas', avg: 4.3 },
  { name: 'viewers', canvas: 'viewersCanvas', avg: 231 },
  { name: 'contacts', canvas: 'contactsCanvas', avg: 68 },
])
const tab = ref('satisfaction')

function updateDashboard(selectedRangeIdx: any) {
  const rangeDates = periodList[selectedRangeIdx].before
  const initDate = getInitDate(rangeDates)
  const finishDate = getEndOfDate()
  const prevInitDate = getInitDate(rangeDates, initDate)
  const prevFinishDate = new Date(initDate.getTime())
}

function getInitDate(beforeRange: IPreviousRange, offsetDate?: Date): Date {
  const _initDate = offsetDate ? new Date(offsetDate.getTime()) : new Date()
  if (beforeRange.type === 'day') {
    _initDate.setDate(_initDate.getDate() - beforeRange.back)
  }
  if (beforeRange.type === 'month') {
    _initDate.setMonth(_initDate.getMonth() - beforeRange.back)
  }
  if (beforeRange.type === 'year') {
    _initDate.setFullYear(_initDate.getFullYear() - beforeRange.back)
  }
  _initDate.setHours(0, 0, 0, 0)
  return _initDate
}

let mainGraphCanvas, satisfactionGraphCanvas, viewersGraphCanvas, contactsGraphCanvas
let mainGraph: Chart<'bar', number[], string>
let satisfactionGraph: Chart<'bar', number[], string>
let viewersGraph: Chart<'bar', number[], string>
let contactsGraph: Chart<'bar', number[], string>
let satisfactionCanvasCtx, viewersCanvasCtx, contactCanvasCtx
let satisfactionGradient: CanvasGradient
let viewersGradient: CanvasGradient
let contactsGradient: CanvasGradient

const satisfactionData = {
  labels: ['2022-12-01', '2022-12-03', '2022-12-05', '2022-12-08', '2022-12-11', '2022-12-14'],
  datasets: [
    {
      fill: true,
      label: '% satisfaction',
      data: [3, 2.5, 2.1, 3.4, 4.1, 2.9, 3.1],
      // borderWidth: 1,
      borderColor: '#90EBBC',
      tension: 0.4,
    },
  ],
}

const viewersData = {
  labels: ['2022-12-01', '2022-12-04', '2022-12-05', '2022-12-08', '2022-12-12', '2022-12-14'],
  datasets: [
    {
      fill: true,
      label: '# of Views',
      data: [150, 113, 178, 166, 170, 141, 150],
      // borderWidth: 1,
      borderColor: '#55E3DD',
      tension: 0.4,
    },
  ],
}

const contactsData = {
  labels: ['2022-12-01', '2022-12-03', '2022-12-05', '2022-12-08', '2022-12-11', '2022-12-14'],
  datasets: [
    {
      fill: true,
      label: '# of contacts',
      data: [121, 101, 131, 151, 123, 142],
      // borderWidth: 1,
      borderColor: '#5BE355',
      tension: 0.4,
    },
  ],
}

onMounted(() => {
  mainGraphCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement
  satisfactionGraphCanvas = document.getElementById(tabOptions.value[0].canvas) as HTMLCanvasElement
  viewersGraphCanvas = document.getElementById(tabOptions.value[1].canvas) as HTMLCanvasElement
  contactsGraphCanvas = document.getElementById(tabOptions.value[2].canvas) as HTMLCanvasElement

  // canvasCtx = mainGraphCanvas.getContext('2d')
  satisfactionCanvasCtx = satisfactionGraphCanvas.getContext('2d')
  viewersCanvasCtx = viewersGraphCanvas.getContext('2d')
  contactCanvasCtx = contactsGraphCanvas.getContext('2d')
  if (satisfactionCanvasCtx) {
    satisfactionGradient = satisfactionCanvasCtx.createLinearGradient(0, 0, 0, 300)
    satisfactionGradient.addColorStop(0, '#90EBBC')
    satisfactionGradient.addColorStop(1, '#FFFFFF')
  }
  if (viewersCanvasCtx) {
    viewersGradient = viewersCanvasCtx.createLinearGradient(0, 0, 0, 300)
    viewersGradient.addColorStop(0, '#55E3DD')
    viewersGradient.addColorStop(1, '#FFFFFF')
  }
  if (contactCanvasCtx) {
    contactsGradient = contactCanvasCtx.createLinearGradient(0, 0, 0, 300)
    contactsGradient.addColorStop(0, '#5BE355')
    contactsGradient.addColorStop(1, '#FFFFFF')
  }

  // @ts-expect-error: background is not a property
  satisfactionData.datasets[0]['backgroundColor'] = satisfactionGradient
  // @ts-expect-error: background is not a property
  viewersData.datasets[0]['backgroundColor'] = viewersGradient
  // @ts-expect-error: background is not a property
  contactsData.datasets[0]['backgroundColor'] = contactsGradient

  mainGraph = new Chart(mainGraphCanvas, {
    type: 'line',
    data: satisfactionData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
  satisfactionGraph = new Chart(satisfactionGraphCanvas, {
    type: 'line',
    data: satisfactionData,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  })
  viewersGraph = new Chart(viewersGraphCanvas, {
    type: 'line',
    data: viewersData,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  })
  contactsGraph = new Chart(contactsGraphCanvas, {
    type: 'line',
    data: contactsData,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
          beginAtZero: true,
        },
      },
    },
  })
})

function updateGraph(tabOption: string): void {
  tab.value = tabOption
  if (mainGraph) {
    if (tabOption === 'satisfaction') {
      mainGraph.data = satisfactionData
    }
    if (tabOption === 'viewers') {
      mainGraph.data = viewersData
    }
    if (tabOption === 'contacts') {
      mainGraph.data = contactsData
    }
  }
  mainGraph.update()
}
</script>

<style scoped>
.mainCardSelected {
  transform: scale(0.98);
  /* Scaling button to 0.98 to its original size */
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  /* Lowering the shadow */
  background-color: #eff4ff;
}
.mainCard:hover {
  cursor: pointer;
  background-color: #f3fafa;
}
</style>
