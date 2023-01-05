<template>
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <h3>{{ coords.latitude }}</h3>
        <h3>{{ coords.longitude }}</h3>
        <!-- <input id="pac-input" class="controls" type="text" placeholder="Search Box" /> -->
        <div class="input-contain">
          <input
            type="text"
            id="pac-input"
            name="pac-input"
            autocomplete="false"
            placeholder="Dirección"
          />
        </div>
        <div id="map" style="width: 100%; height: 80vh" />
        <q-input v-model="url" filled type="url" label="Web Oficial">
          <template v-slot:prepend>
            <q-icon name="language" />
          </template>
        </q-input>
        <q-input v-model="email" filled type="email" label="Email de contacto">
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
          <q-input v-model="tel" filled type="tel" label="Teléfono">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>

        <div class="col" align="right">
          <!-- <q-btn label="Clean" type="reset" color="primary" flat class="q-ml-sm" /> -->
          <q-btn label="Clean" color="primary" @click="test" flat class="q-ml-sm" />
          <q-btn label="Publish" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { COUNTRIES } from '@/constants'
import { useGeolocation } from '@/utils/useGeolocation'
import { onMounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const tel = ref()
const url = ref()
const email = ref()
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

const { coords } = useGeolocation()

const loader = new Loader({
  libraries: ['places'],
  apiKey: 'AIzaSyByayuBNIozLkNWI1APxoXi6i6OD2qrYr8',
  version: 'weekly',
})

loader.load().then(() => {
  // eslint-disable-next-line no-undef
  const center: google.maps.LatLngLiteral = { lat: 39.512, lng: 2.483 }
  // eslint-disable-next-line no-undef
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    center,
    zoom: 10,
    mapTypeId: 'roadmap',
  })

  const addressInputDiv = document.getElementById('pac-input') as HTMLInputElement
  // eslint-disable-next-line no-undef
  const searchBox = new google.maps.places.SearchBox(addressInputDiv)

  map.addListener('bounds_changed', () => {
    // eslint-disable-next-line no-undef
    searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds)
  })

  // eslint-disable-next-line no-undef
  let markers: google.maps.Marker[] = []

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces()
    if (places) {
      if (places.length == 0) {
        return
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null)
      })
      markers = []

      // For each place, get the icon, name and location.
      // eslint-disable-next-line no-undef
      const bounds = new google.maps.LatLngBounds()

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log('Returned place contains no geometry')
          return
        }

        const icon = {
          url: place.icon as string,
          // eslint-disable-next-line no-undef
          size: new google.maps.Size(71, 71),
          // eslint-disable-next-line no-undef
          origin: new google.maps.Point(0, 0),
          // eslint-disable-next-line no-undef
          anchor: new google.maps.Point(17, 34),
          // eslint-disable-next-line no-undef
          scaledSize: new google.maps.Size(25, 25),
        }

        // Create a marker for each place.
        markers.push(
          // eslint-disable-next-line no-undef
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          }),
        )

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
      })
      map.fitBounds(bounds)
    } else {
      return
    }
  })
})
</script>

<style scoped>
/* #pac-input {
  background-color: #e0e0e0;
  font-family: Roboto;
  font-size: 15px;
  padding: 0 11px 0 13px;
  text-overflow: ellipsis;
  border-radius: 0.2rem;
  width: 400px;
} */

.input-contain {
  position: relative;
}
#pac-input {
  font-size: 17px;
  height: 3.2rem;
  width: 100%;
  padding: 0 0 0 13px;
  background-color: #eeeeee;
  text-overflow: ellipsis;
  border-radius: 0.2rem;
  border: 1px solid #eeeeee;
  outline: none;
}
</style>
