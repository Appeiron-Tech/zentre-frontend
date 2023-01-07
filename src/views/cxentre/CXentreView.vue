<template>
  <div class="q-pa-md">
    <q-table
      grid
      grid-header
      :card-container-class="cardContainerClass"
      title="Opiniones"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      v-model:pagination="pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-subtitle1" :style="{ fontSize: 12 + props.row.rate * 2.3 + 'px' }">
                {{ props.row.comment }}
              </div>
              <div class="text-caption text-grey">
                {{ formattedDate(props.row.createdAt, true) }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="flex flex-center">
              <q-rating
                v-model="props.row.rate"
                :size="14 + props.row.rate * 5.4 + 'px'"
                icon="star_border"
                icon-selected="star"
                color="secondary"
                readonly
              />
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts" setup>
import { QCard, QCardSection, QIcon, QInput, QSeparator, QTable, useQuasar } from 'quasar'
import { ref, computed, watch } from 'vue'
import type { ISurvey } from './interfaces/ISurvey'
import { formattedDate } from '../../utils/time'

const rows = ref<ISurvey[]>([
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
  {
    id: 6,
    storeId: 1,
    rate: 3,
    comment: 'Neque 3 r sit amet, consectetur, adipisci velit...',
    createdAt: new Date('2022-09-10 07:12:33'),
  },
  {
    id: 7,
    storeId: 1,
    rate: 4,
    comment: 'Neque 4 porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur',
    createdAt: new Date('2022-11-11 10:34:33'),
  },
  {
    id: 8,
    storeId: 1,
    rate: 3,
    comment:
      'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    createdAt: new Date('2022-09-01 09:12:30'),
  },
  {
    id: 9,
    storeId: 1,
    rate: 2,
    comment:
      'Neque 2 porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    createdAt: new Date('2022-10-17 09:55:33'),
  },
  {
    id: 33,
    storeId: 1,
    rate: 1,
    comment: 'qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
    createdAt: new Date('2022-11-01 09:55:33'),
  },
  {
    id: 32,
    storeId: 1,
    rate: 0,
    comment: 'ipsum quia dolor sit amet, consectetur, adipisci velit...',
    createdAt: new Date('2022-10-30 09:55:33'),
  },
  {
    id: 10,
    storeId: 1,
    rate: 5,
    comment: 'Neque 5 porro quisquam.',
    createdAt: new Date('2022-11-02 23:55:33'),
  },
  {
    id: 11,
    storeId: 1,
    rate: 5,
    comment: 'Neque 5 porro quisquam est qui consectetur, adipisci velit...',
    createdAt: new Date('2022-11-18 09:10:33'),
  },
  {
    id: 12,
    storeId: 1,
    rate: 2,
    comment: 'Neque 2 porro quisquam est amet, consectetur, adipisci velit...',
    createdAt: new Date('2022-10-23 09:55:33'),
  },
  {
    id: 13,
    storeId: 1,
    rate: 0,
    comment: '',
    createdAt: new Date('2022-10-09 09:55:33'),
  },
  {
    id: 14,
    storeId: 1,
    rate: 2,
    comment: '',
    createdAt: new Date('2022-10-03 06:32:33'),
  },
  {
    id: 15,
    storeId: 1,
    rate: 5,
    comment: '',
    createdAt: new Date('2022-11-15 09:55:33'),
  },
  {
    id: 16,
    storeId: 1,
    rate: 0,
    comment: '',
    createdAt: new Date('2022-09-10 09:55:33'),
  },
  {
    id: 17,
    storeId: 1,
    rate: 0,
    comment: 'porro quisquam est qui conse',
    createdAt: new Date('2022-09-19 09:55:33'),
  },
  {
    id: 17,
    storeId: 1,
    rate: 4,
    comment: 'porro 4 quisquam est qui conse',
    createdAt: new Date('2022-09-24 11:11:33'),
  },
])

const $q = useQuasar()

function getItemsPerPage() {
  if ($q.screen.lt.sm) {
    return 4
  }
  if ($q.screen.lt.md) {
    return 8
  }
  return 12
}

const filter = ref('')
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
})

watch(
  () => $q.screen.name,
  () => {
    pagination.value.rowsPerPage = getItemsPerPage()
  },
)

const columns = ref([
  { name: 'rate', label: 'Rate', field: 'rate', sortable: true },
  { name: 'comment', label: 'Comment', field: 'comment' },
  { name: 'createdAt', label: 'Created At', field: 'createdAt', sortable: true },
])

const cardContainerClass = computed(() => {
  return $q.screen.gt.xs ? 'grid-masonry grid-masonry--' + ($q.screen.gt.sm ? '3' : '2') : ''
})

const rowsPerPageOptions = computed(() => {
  return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3]
})
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column
  height: 700px

  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>
