<script setup lang="ts">
// https://github.com/codingwithjustin/vue-google-maps/blob/master/src/App.vue
// https://developers.google.com/maps/documentation/javascript/geolocation
import { COUNTRIES } from '@/constants'
import type { ICountry } from '@/constants'
import { ref, onBeforeMount, watch } from 'vue'
import { isObjectEmpty } from '@/utils/validators'
import { useCentredStore } from '@/stores/centred.store'
import type { IContact } from '@/models/centred/Centred.interface'
import BaseInput from '@/components/base/inputs/BaseInput.vue'

const centredStore = useCentredStore()
const contact = ref({} as IContact)
const contactHasChange = ref(false)
const contactCountryCode = ref()

onBeforeMount(async () => {
  if (isObjectEmpty(centredStore.centred)) {
    await centredStore.fetch('6498a94e213a7fc800781e1a')
  }
  contact.value = centredStore.getContact
  contactCountryCode.value = getCountry(contact.value.phones[0].countryCode ?? '')
})

function onSubmit() {
  // if (sns.value?.name === '') {
}

function getCountry(countryCodeWithPlus: string): ICountry {
  const countryCode = Number(countryCodeWithPlus.replace('+', ''))
  return (
    COUNTRIES.find((country) => country.country_code === countryCode) ?? {
      iso2: 'ES',
      img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg',
      country_code: 34,
    }
  )
}

watch(
  () => contact.value,
  (newValue, oldValue) => {
    if (oldValue !== null && !isObjectEmpty(oldValue)) {
      contactHasChange.value = true
    }
  },
  { deep: true },
)
</script>

<template>
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <BaseInput v-model="contact.website" type="url" label="Web Oficial" icon="language" />
        <BaseInput v-model="contact.emails[0]" type="email" label="Email de contacto" icon="mail" />
        <div class="q-gutter-md row justify-start">
          <q-select
            filled
            v-model="contactCountryCode"
            :options="COUNTRIES"
            label="País"
            color="teal"
            :display-value="'+' + contactCountryCode.country_code"
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
          <BaseInput v-model="contact.phones[0].number" type="tel" label="Teléfono" icon="phone" />
        </div>
        <q-separator spaced />
        <BaseInput v-model="contact.address" type="text" label="Address" icon="location_on" />

        <div class="col" align="right">
          <q-btn label="Publish" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </main>
</template>
