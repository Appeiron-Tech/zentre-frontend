<script setup lang="ts">
// https://github.com/codingwithjustin/vue-google-maps/blob/master/src/App.vue
// https://developers.google.com/maps/documentation/javascript/geolocation
import { COUNTRIES } from '@/constants'
import { onUnmounted, ref, onBeforeMount } from 'vue'
import { useCentredStore } from '@/stores/centred.store'
import type { IContact } from '@/models/centred/Centred.interface'
import { isObjectEmpty } from '@/utils/validators'

const centredStore = useCentredStore()
const contact = ref({} as IContact)
const contactHasChange = ref(false)

onBeforeMount(async () => {
  if (isObjectEmpty(centredStore.centred)) {
    await centredStore.fetch('6498a94e213a7fc800781e1a')
  }
  contact.value = centredStore.getContact
})

const countryCodes = ref({
  iso2: 'ES',
  img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg',
  country_code: 34,
})

function onSubmit() {
  // if (sns.value?.name === '') {
}

function test() {
  const tt = (document.getElementById('pac-input') as HTMLInputElement).value
  console.log(tt)
}

function onReset() {
  // age.value = null
}

let boundsListener: { remove: () => void } | null = null
let searchBoxListener: { remove: () => void } | null = null

onUnmounted(async () => {
  if (boundsListener) boundsListener.remove()
  if (searchBoxListener) searchBoxListener.remove()
})
</script>

<template>
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- <input id="pac-input" class="controls" type="text" placeholder="Search Box" /> -->
        <q-input v-model="contact.website" filled type="url" label="Web Oficial">
          <template v-slot:prepend>
            <q-icon name="language" />
          </template>
        </q-input>
        <q-input v-model="contact.emails[0]" filled type="email" label="Email de contacto">
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
        <div class="q-gutter-md row justify-start">
          <q-select
            filled
            v-model="countryCodes"
            :options="COUNTRIES"
            label="País"
            color="teal"
            :display-value="'+' + countryCodes.country_code"
            options-selected-class="text-deep-orange"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <q-icon :name="'img:' + scope.opt.img_url" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.country_code }}</q-item-label>
                  <q-item-label caption>{{ scope.opt.iso2 }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input v-model="contact.phones[0].number" filled type="tel" label="Teléfono">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>

        <q-separator spaced />

        <q-input v-model="contact.address" filled type="text" label="Address">
          <template v-slot:prepend>
            <q-icon name="location_on" />
          </template>
        </q-input>

        <div class="col" align="right">
          <!-- <q-btn label="Clean" type="reset" color="primary" flat class="q-ml-sm" /> -->
          <q-btn label="Clean" color="primary" @click="test" flat class="q-ml-sm" />
          <q-btn label="Publish" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </main>
</template>
