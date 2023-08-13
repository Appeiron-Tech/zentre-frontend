<script setup lang="ts">
import type { ISns } from '@/models/centred/School.interface'
import { useCentredStore } from '@/stores/centred.store'
import { useQuasar } from 'quasar'
import { isObjectEmpty } from '@/utils/validators'
import { onBeforeMount, ref, watch } from 'vue'

const centredStore = useCentredStore()
const sns = ref<ISns[]>([])
const snsHasChange = ref(false)
const $q = useQuasar()

onBeforeMount(async () => {
  if (isObjectEmpty(centredStore.centred)) {
    await centredStore.fetch('6498a94e213a7fc800781e1a')
  }
  sns.value = centredStore.getSns
})

function onSubmit() {
  centredStore.updateSns(sns.value)
  snsHasChange.value = false
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted',
  })
}

watch(
  () => sns.value,
  (newValue, oldValue) => {
    if (oldValue.length) {
      snsHasChange.value = true
    }
  },
  { deep: true },
)
</script>

<template>
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-list padding>
          <q-item v-for="(sn, index) in sns" :key="index" tag="div" color="primary">
            <q-item-section>
              <q-input v-model="sn.url" :label="sn.name" rounded outlined>
                <template v-slot:prepend>
                  <q-avatar text-color="grey">
                    <q-icon size="1.5em" :name="sn.icon" />
                  </q-avatar>
                </template>
                <template v-slot:append>
                  <q-toggle :disable="sn.url.length == 0" color="green" v-model="sn.show">
                    <q-tooltip :target="sn.url.length == 0">
                      {{ $t('SocialNetworks.urlTooltip') }}
                    </q-tooltip>
                  </q-toggle>
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="col" align="right">
          <q-btn label="Publish" type="submit" color="primary" :disable="!snsHasChange" />
        </div>
      </q-form>
    </div>
  </main>
</template>
