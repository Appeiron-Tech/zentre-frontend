<script setup lang="ts">
// https://github.com/codingwithjustin/vue-google-maps/blob/master/src/App.vue
// https://developers.google.com/maps/documentation/javascript/geolocation
import { useQuasar } from 'quasar'
import { COUNTRIES } from '../../../constants'
import type { ICountry } from '../../../constants'
import { ref, onBeforeMount, watch } from 'vue'
import { isObjectEmpty } from '../../../utils/validators'
import { useCompanyStore } from '../../../stores/company.store'
import BaseInput from '../../../components/base/inputs/BaseInput.vue'
import type { IPhone, IContact as IStoreContact } from '../../../models/centred/Company.interfaces'

interface IContact {
  phones: IPhone[]
  emails: string[]
  address: string
  website: string
}

const companyStore = useCompanyStore()
const contact = ref({} as IContact)
const contactHasChange = ref(false)
const contactCountries = ref()
const $q = useQuasar()

onBeforeMount(async () => {
  if (isObjectEmpty(companyStore.company)) {
    await companyStore.fetch('6498a94e213a7fc800781e1a')
  }
  contact.value = parseContacts(companyStore.getContact)
})

function parseContacts(contactStore: IStoreContact): IContact {
  const phonesObj = contactStore.phones.map((rawPhone) => {
    const splitPhone = String(rawPhone).split(' ')
    return {
      countryCode: splitPhone[0],
      phone: splitPhone[1],
    }
  })
  contactCountries.value = phonesObj.map((phone) => getCountry(phone.countryCode ?? ''))
  return {
    phones: phonesObj,
    emails: contactStore.emails,
    address: contactStore.address,
    website: contactStore.website,
  }
}

function onSubmit() {
  const contactToUpdate = {
    phones: contact.value.phones.map(
      (phone, index) => `${contactCountries.value[index].country_code} ${phone.phone}`,
    ),
    emails: contact.value.emails,
    address: contact.value.address,
    website: contact.value.website,
  }
  companyStore.updateContact(contactToUpdate)
  contactHasChange.value = false
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted',
  })
}

function getCountry(countryCode: string): ICountry {
  return (
    COUNTRIES.find((country) => country.country_code === Number(countryCode)) ?? {
      iso2: 'ES',
      img_url: 'http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg',
      country_code: 34,
    }
  )
}

watch(
  () => contactCountries.value,
  (newValue, oldValue) => {
    if (oldValue) {
      contactHasChange.value = true
    }
  },
  { deep: true },
)

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
        <BaseInput
          v-model="contact.website"
          type="url"
          :label="$t('ContactView.websiteLabel')"
          icon="language"
        />
        <BaseInput
          v-model="contact.emails[0]"
          type="email"
          :label="$t('ContactView.emailLabel')"
          icon="mail"
        />
        <div class="q-gutter-md row justify-start">
          <q-select
            filled
            v-model="contactCountries[0]"
            :options="COUNTRIES"
            :label="$t('ContactView.countryCodeLabel')"
            color="teal"
            :display-value="'+' + contactCountries[0].country_code"
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
          <BaseInput
            v-model="contact.phones[0].phone"
            type="tel"
            :label="$t('ContactView.phone')"
            icon="phone"
          />
        </div>
        <q-separator spaced />
        <BaseInput
          v-model="contact.address"
          type="text"
          :label="$t('ContactView.addressLabel')"
          icon="location_on"
        />
        <div class="col" align="right">
          <q-btn label="Publish" type="submit" color="primary" :disable="!contactHasChange" />
        </div>
      </q-form>
    </div>
  </main>
</template>
