<template>
  <!-- https://codesandbox.io/s/vue-advanced-cropper-basic-jfy5w?file=/src/App.vue -->
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- Cover -->
        <q-card flat>
          <q-card-section horizontal>
            <q-img :src="businessInfo.cover_url" :ratio="9 / 3">
              <div class="absolute-top text-subtitle1 text-center">Cover</div>
            </q-img>
            <q-card-actions vertical class="justify-around">
              <q-input
                ref="coverInputName"
                style="display: none"
                v-model="cover"
                type="file"
                label="Standard"
              />
              <q-btn flat round color="primary" icon="edit" @click="getCoverFile"></q-btn>
            </q-card-actions>
          </q-card-section>
        </q-card>
        <!-- Cover cropper -->
        <q-dialog v-model="coverDialog">
          <q-card>
            <cropper
              ref="refCoverCropper"
              :src="coverPicked"
              :stencil-size="{
                width: 500,
                height: 200,
              }"
              :stencil-props="{
                handlers: {},
                movable: false,
                resizable: false,
              }"
              image-restriction="stencil"
            />
            <q-separator dark />
            <q-card-actions align="right">
              <q-btn flat color="secondary" icon="cancel" @click="closeCoverDialog">Cancel</q-btn>
              <q-btn flat color="primary" icon="aspect_ratio" @click="cropCoverImage"
                >Crop image</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Business Image -->
        <div class="column items-center">
          <div class="col">
            <q-card flat>
              <q-card-section horizontal>
                <div class="column items-center">
                  <div class="col">
                    <q-avatar v-if="businessInfo.profile_url" size="200px">
                      <q-img :src="businessInfo.profile_url">
                        <div class="absolute-top text-subtitle1 text-center">Logo</div>
                      </q-img>
                    </q-avatar>
                  </div>
                </div>
                <q-card-actions vertical class="justify-around">
                  <q-input
                    ref="profileInputName"
                    style="display: none"
                    v-model="profile"
                    type="file"
                    label="Standard"
                  />
                  <q-btn flat round color="primary" icon="edit" @click="getProfileFile"></q-btn>
                </q-card-actions>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <!-- Profile cropper -->
        <q-dialog v-model="profileDialog">
          <q-card>
            <cropper
              ref="refProfileCropper"
              :src="profilePicked"
              :stencil-size="{
                width: 500,
                height: 200,
              }"
              :stencil-props="{
                handlers: {},
                movable: false,
                resizable: false,
              }"
              image-restriction="stencil"
            />
            <q-separator dark />
            <q-card-actions align="right">
              <q-btn flat color="secondary" icon="cancel" @click="closeProfileDialog">Cancel</q-btn>
              <q-btn flat color="primary" icon="aspect_ratio" @click="cropProfileImage"
                >Crop image</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-dialog>

        <!-- Business Name -->
        <q-input
          filled
          v-model="businessInfo.name"
          label="Negocio *"
          hint="Nombre de tu negocio"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Por favor, ingrese el nombre del negocio']"
        />

        <!-- Business Description -->
        <q-input
          filled
          v-model="businessInfo.description"
          label="Descripción *"
          hint="Descripción de tu negocio"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, ingrese la descripción del negocio',
          ]"
        />
        <div class="col" align="right">
          <q-btn label="Clean" type="reset" color="primary" flat class="q-ml-sm" />
          <q-btn label="Publish" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import type { IBasicInfo } from './interfaces/IBasicInfo'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const $q = useQuasar()

const refProfileCropper = ref()
const profile = ref()
const profilePicked = ref()
const profileDialog = ref(false)
const profileInputName = ref()
const cover = ref()
const coverPicked = ref()
const coverDialog = ref(false)
const coverInputName = ref()
const refCoverCropper = ref()
const businessInfo = ref<IBasicInfo>({
  cover_name: '',
  cover_url: '',
  profile_name: '',
  profile_url: '',
  name: '',
  description: '',
})

onMounted(() => {
  businessInfo.value = {
    cover_name: 'myCoverPicture.png',
    cover_url: 'https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg',
    profile_name: 'myProfilePicture.png',
    profile_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    name: 'Zentre',
    description: 'Zentre Description',
  }
})

function onSubmit() {
  if (businessInfo.value?.name === '') {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
    })
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted',
    })
  }
}

watch(cover, (newCoverFiles) => {
  const newCover = newCoverFiles[0]
  coverPicked.value = URL.createObjectURL(newCover)
  coverDialog.value = true
})

watch(profilePicked, (newProfile) => {
  businessInfo.value.profile_url = URL.createObjectURL(newProfile)
})

function onReset() {
  // age.value = null
}

function cropCoverImage() {
  const result = refCoverCropper.value.getResult()
  const cropperImage = result.canvas.toDataURL('image/jpg')
  businessInfo.value.cover_url = cropperImage
  coverDialog.value = false
}

function closeCoverDialog(): void {
  coverPicked.value = null
  coverDialog.value = false
}

function cropProfileImage() {
  const result = refProfileCropper.value.getResult()
  const croppedImage = result.canvas.toDataURL('image/jpg')
  businessInfo.value.profile_url = croppedImage
  profileDialog.value = false
}

function closeProfileDialog(): void {
  profilePicked.value = null
  profileDialog.value = false
}

function getCoverFile() {
  coverInputName.value.$el.click()
}

function getProfileFile() {
  profileInputName.value.$el.click()
}
</script>

<style>
.cropper {
  min-height: 300px;
  width: 100%;
}
</style>
