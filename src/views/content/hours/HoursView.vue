<template>
  <main>
    <div class="q-px-xs">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-list bordered class="rounded-borders">
          <q-item v-for="(weekDay, wdIndex) in 7" :key="wdIndex">
            <q-item-section top :class="$q.screen.lt.md ? 'col-1' : 'col-2'">
              <span>
                {{ weekDay + '-Lunes' }}
              </span>
              <q-toggle
                v-model="openStatusByDay[weekDay - 1]"
                color="green"
                :label="$q.screen.lt.md ? '' : openStatusByDay[weekDay - 1] ? 'Abierto' : 'Cerrado'"
                icon="storefront"
              />
            </q-item-section>

            <q-item-section top>
              <q-list dense>
                <q-item
                  v-for="(openingHour, opIndex) in getOpeningHoursByDay(1, weekDay)"
                  :key="opIndex"
                >
                  <q-item-section>
                    <q-item-label>
                      <span class="text-weight-medium">
                        <!-- <q-input v-model="openingHour.fromHour" filled type="time" hint="Abre a" /> -->
                        <q-input
                          :disable="!openStatusByDay[weekDay - 1]"
                          v-model="openingHour.fromHour"
                          filled
                          type="time"
                          stack-label
                          label="Abre a"
                        />
                      </span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section top>
                    <q-item-label>
                      <span class="text-weight-medium">
                        <!-- <q-input v-model="openingHour.toHour" filled type="time" hint="Cierra a" /> -->
                        <q-input
                          :disable="!openStatusByDay[weekDay - 1]"
                          v-model="openingHour.toHour"
                          filled
                          type="time"
                          stack-label
                          label="Cierra a"
                        />
                      </span>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section top side>
                    <div class="text-grey-8">
                      <q-btn
                        v-if="opIndex == 0"
                        size="1rem"
                        flat
                        round
                        icon="add"
                        :disable="!openStatusByDay[weekDay - 1]"
                      />
                      <q-btn
                        v-else
                        size="1rem"
                        flat
                        round
                        icon="delete"
                        :disable="!openStatusByDay[weekDay - 1]"
                      />
                      <!-- <q-btn size="1rem" flat round icon="remove" /> -->
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-separator v-if="weekDay < 7" spaced inset />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="col" align="right">
          <!-- <q-btn label="Clean" type="reset" color="secondary" flat class="q-ml-sm" /> -->
          <q-btn label="Clean" color="secondary" flat @click="test" class="q-ml-sm" />
          <q-btn label="Publish" type="submit" color="secondary" />
        </div>
      </q-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { IHours, IOpeningHours } from './interfaces/IOpeningHours'

const openingHoursByStore = ref<IOpeningHours[]>([
  {
    storeId: 1,
    openingHours: [
      {
        weekDay: 1,
        hours: [
          {
            id: 1,
            fromHour: '09:00',
            toHour: '14:00',
          },
          {
            id: 7,
            fromHour: '16:00',
            toHour: '20:00',
          },
        ],
      },
      {
        weekDay: 2,
        hours: [
          {
            id: 2,
            fromHour: '09:00',
            toHour: '20:00',
          },
        ],
      },
      {
        weekDay: 3,
        hours: [
          {
            id: 3,
            fromHour: '09:00',
            toHour: '20:00',
          },
        ],
      },
      {
        weekDay: 4,
        hours: [
          {
            id: 4,
            fromHour: '09:00',
            toHour: '20:00',
          },
        ],
      },
      {
        weekDay: 5,
        hours: [
          {
            id: 5,
            fromHour: '09:00',
            toHour: '20:00',
          },
        ],
      },
      {
        weekDay: 6,
        hours: [
          {
            id: 6,
            fromHour: '09:00',
            toHour: '14:00',
          },
        ],
      },
      {
        weekDay: 7,
        hours: [],
      },
    ],
  },
])

let openStatusByDay = ref<boolean[]>([])

onMounted(() => {
  openStatusByDay.value = [true, true, true, true, true, true, false]
})

function onSubmit() {
  // if (sns.value?.name === '') {
  //   $q.notify({
  //     color: 'red-5',
  //     textColor: 'white',
  //     icon: 'warning',
  //     message: 'You need to accept the license and terms first',
  //   })
  // } else {
  //   $q.notify({
  //     color: 'green-4',
  //     textColor: 'white',
  //     icon: 'cloud_done',
  //     message: 'Submitted',
  //   })
  // }
}

function test() {
  console.log(openingHoursByStore.value[0])
}

function getOpeningHoursByDay(storeId: number, weekDay: number): IHours[] {
  const storeOpeningHours = openingHoursByStore.value.find((op) => op.storeId == storeId)
  const dayOpeningHours = storeOpeningHours?.openingHours.find((op) => op.weekDay == weekDay)
  if (dayOpeningHours?.hours.length) {
    return dayOpeningHours.hours
  } else {
    return [
      {
        id: 99,
        fromHour: '09:00',
        toHour: '22:00',
      },
    ]
  }
}

function onReset() {
  // age.value = null
}
</script>
