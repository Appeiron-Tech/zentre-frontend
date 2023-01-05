<template>
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-list padding>
          <q-item v-for="(sn, index) in sns" :key="index" tag="div" color="primary">
            <q-item-section>
              <q-input v-model="sn.url" :label="sn.code" rounded outlined>
                <template v-slot:prepend>
                  <q-avatar text-color="grey">
                    <q-icon
                      size="1.5em"
                      :name="SNS_DEFAULT_VALUES.find((v) => v.code == sn.code)?.values.icon"
                    />
                  </q-avatar>
                </template>
                <template v-slot:append>
                  <q-toggle
                    :disable="sn.url.length == 0"
                    color="green"
                    v-model="sns[index].show"
                    :val="sns[index].code"
                  >
                    <q-tooltip
                      :target="sn.url.length == 0"
                      transition-show="rotate"
                      transition-hide="rotate"
                    >
                      Ingresar el link a la cuenta de {{ sn.code }} del negocio
                    </q-tooltip>
                  </q-toggle>
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="col" align="right">
          <q-btn label="Clean" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Publish" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { SNS_DEFAULT_VALUES } from '@/constants'
import { ref } from 'vue'
import type { ISns } from './interfaces/ISns'

const sns = ref<ISns[]>([
  {
    code: 'FCBK',
    url: 'www.facebook.com',
    show: false,
  },
  {
    code: 'INST',
    url: 'www.instagram.com',
    show: false,
  },
  {
    code: 'TWTR',
    url: 'www.twitter.com',
    show: false,
  },
  {
    code: 'WWEB',
    url: 'www.appeiron.tech',
    show: false,
  },
])

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
  console.log(sns.value)
}

function onReset() {
  // age.value = null
}
</script>
