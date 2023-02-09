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
      <div class="col-9 q-pa-md">
        <div class="q-gutter-y-md">
          <!-- <q-tabs v-model="tab" align="center"> -->
          <div class="row justify-center">
            <template v-for="(tabOption, index) in tabOptions" :key="index">
              <div class="col-9 col-md-4 q-px-md">
                <q-card
                  rounded
                  @click="updateGraph(tabOption.name)"
                  :class="tab === tabOption.name ? 'mainCardSelected' : 'mainCard'"
                >
                  <q-card-section horizontal>
                    <!-- <q-card-section class="q-pt-xs" style="width: 50%; padding-left: 8px; padding-right: 0px"> -->
                    <q-card-section class="col-3 q-pt-xs q-pr-xs">
                      <div class="text-overline">Average:</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">
                        <strong>{{ tabOption.avg }}</strong>
                      </div>
                      <div class="text-caption text-grey">{{ tabOption.name }}</div>
                    </q-card-section>
                    <!-- <q-card-section class="col-5 flex flex-center"> -->
                    <q-card-section class="flex flex-center q-pr-md">
                      <!-- <q-card-section> -->
                      <div class="rounded-borders" style="width: 250px; background-color: white">
                        <canvas :id="tabOption.canvas"></canvas>
                      </div>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </div>
              <!-- <q-separator v-if="index < 2" spaced vertical inset /> -->
            </template>
          </div>
          <div class="row justify-center">
            <div
              class="col-9 col-md-8 col-md-4"
              style="width: 90%; object-fit: contain; background-color: white"
            >
              <canvas style="width: 100%; object-fit: contain" id="mainCanvas"></canvas>
            </div>
          </div>
          <div class="row justify-center">
            <div
              class="col-9 col-md-8 col-md-4"
              style="width: 90%; object-fit: contain; background-color: white"
            >
              <canvas style="width: 100%; object-fit: contain" id="productsSellsCanvas"></canvas>
            </div>
          </div>

          <!-- last 5 comments -->
          <div class="row justify-center">
            <div class="col-6 col-md-6 col-md-4 q-pa-lg" style="background-color: white">
              <q-list>
                <q-item v-for="(topComment, idx) in topComments" :key="idx">
                  <q-item-section>
                    <q-item-label>Single line item</q-item-label>
                    <q-item-label caption
                      >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                      elit.</q-item-label
                    >
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
            </div>
            <q-separator spaced vertical inset />
            <div class="col-5 col-md-5 col-md-4 q-pa-lg" style="background-color: white">
              <canvas style="object-fit: contain" id="reviewsByRatingCanvas"></canvas>
            </div>
          </div>
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
import type { ISurvey } from '../cxentre/interfaces/ISurvey'

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

const topComments = ref<ISurvey[]>([
  {
    id: 1,
    storeId: 1,
    rate: 3,
    comment: 'A really good place to eat',
    createdAt: new Date('2022-11-10 09:55:33'),
  },
  {
    id: 2,
    storeId: 1,
    rate: 1,
    comment: 'A medium place to eat',
    createdAt: new Date('2022-11-09 09:50:33'),
  },
  {
    id: 3,
    storeId: 1,
    rate: 5,
    comment: 're mrejk lkjlk lkj lkj ljkli mmmi miii fewr werwe rewrffdf ewredfe',
    createdAt: new Date('2022-11-10 09:55:33'),
  },
  {
    id: 4,
    storeId: 1,
    rate: 4,
    comment:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
    createdAt: new Date('2022-10-10 07:30:33'),
  },
  {
    id: 5,
    storeId: 1,
    rate: 5,
    comment: 'Good Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
    createdAt: new Date('2022-08-01 11:10:33'),
  },
])

const reviewsByRatingsData = {
  labels: ['0-1', '2', '3', '4', '5'],
  datasets: [
    {
      label: 'Reviews by rating',
      data: [34, 12, 23, 30, 45],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1,
      hoverOffset: 5,
    },
  ],
}

function updateDashboard(selectedRangeIdx: any) {
  const rangeDates = periodList[selectedRangeIdx].before
  const initDate = getInitDate(rangeDates)
  // const finishDate = getEndOfDate()
  // const prevInitDate = getInitDate(rangeDates, initDate)
  // const prevFinishDate = new Date(initDate.getTime())
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

const labels = ['Prod-1', 'Prod-2', 'Prod-3', 'Prod-4', 'Prod-5', 'Prod-6', 'Prod-7']
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
      ],
      borderWidth: 1,
    },
  ],
}

onMounted(() => {
  mainGraphCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement
  satisfactionGraphCanvas = document.getElementById(tabOptions.value[0].canvas) as HTMLCanvasElement
  viewersGraphCanvas = document.getElementById(tabOptions.value[1].canvas) as HTMLCanvasElement
  contactsGraphCanvas = document.getElementById(tabOptions.value[2].canvas) as HTMLCanvasElement

  const productsSellsGraphCanvas = document.getElementById(
    'productsSellsCanvas',
  ) as HTMLCanvasElement

  const reviewsByRatingGraphCanvas = document.getElementById(
    'reviewsByRatingCanvas',
  ) as HTMLCanvasElement

  // canvasCtx = mainGraphCanvas.getContext('2d')
  satisfactionCanvasCtx = satisfactionGraphCanvas.getContext('2d')
  viewersCanvasCtx = viewersGraphCanvas.getContext('2d')
  contactCanvasCtx = contactsGraphCanvas.getContext('2d')
  if (satisfactionCanvasCtx) {
    satisfactionGradient = satisfactionCanvasCtx.createLinearGradient(0, 0, 0, 450)
    satisfactionGradient.addColorStop(0, '#90EBBC')
    satisfactionGradient.addColorStop(1, '#FFFFFF')
  }
  if (viewersCanvasCtx) {
    viewersGradient = viewersCanvasCtx.createLinearGradient(0, 0, 0, 450)
    viewersGradient.addColorStop(0, '#55E3DD')
    viewersGradient.addColorStop(1, '#FFFFFF')
  }
  if (contactCanvasCtx) {
    contactsGradient = contactCanvasCtx.createLinearGradient(0, 0, 0, 450)
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
  new Chart(satisfactionGraphCanvas, {
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
        },
      },
    },
  })
  new Chart(viewersGraphCanvas, {
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
          // beginAtZero: true,
        },
      },
    },
  })
  new Chart(contactsGraphCanvas, {
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
          // beginAtZero: true,
        },
      },
    },
  })

  new Chart(productsSellsGraphCanvas, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })

  new Chart(reviewsByRatingGraphCanvas, {
    type: 'doughnut',
    data: reviewsByRatingsData,
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
