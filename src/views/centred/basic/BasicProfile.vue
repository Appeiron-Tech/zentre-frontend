<script setup lang="ts">
import ImageCropper from '@/components/cropper/ImageCropper.vue'
import { useQuasar } from 'quasar'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
import BaseCardActions from '@/components/base/card/BaseCardActions.vue'
import BaseDialog from '@/components/base/dialog/BaseDialog.vue'
import { onBeforeMount, ref, watch } from 'vue'
import BaseAvatar from '@/components/base/avatar/BaseAvatar.vue'
import BaseImage from '@/components/base/image/BaseImage.vue'
import { useCentredStore } from '@/stores/centred.store'
import type { ICentredBasicProfile } from '@/models/centred/Centred.interface'
import { isObjectEmpty } from '@/utils/validators'

const $q = useQuasar()
const profile = ref()
const profilePicked = ref()
const profileDialog = ref(false)
const profileInputName = ref()
const refProfileCropper = ref()
const cover = ref()
const coverPicked = ref()
const coverDialog = ref(false)
const coverInputName = ref()
const refCoverCropper = ref()
const centredStore = useCentredStore()
const centred = ref({} as ICentredBasicProfile)
const centredHasChange = ref(false)

onBeforeMount(async () => {
  await centredStore.fetch('6498a94e213a7fc800781e1a')
  centred.value = centredStore.getBasicProfile
})

async function onSubmit() {
  console.log(coverPicked.value)
  if (coverPicked.value) {
    //send image to google
    const newCoverUrl = 'newCoverUrl'
    centred.value.coverUrl = newCoverUrl
  }
  if (profilePicked.value) {
    //send image to google
    const newProfileUrl = 'newProfileUrl'
    centred.value.profileUrl = newProfileUrl
  }
  centredStore.updateBasicProfile(centred.value)
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted',
  })
  // $q.notify({
  //   color: 'red-5',
  //   textColor: 'white',
  //   icon: 'warning',
  //   message: 'You need to accept the license and terms first',
  // })
}

const updateCoverRef = (refValue: unknown) => {
  refCoverCropper.value = refValue
}

const updateProfileRef = (refValue: unknown) => {
  refProfileCropper.value = refValue
}

function cropCoverImage(): void {
  const result = refCoverCropper.value.getResult()
  const cropperImage = result.canvas.toDataURL('image/jpg')
  centred.value.coverUrl = cropperImage
  coverDialog.value = false
}

function cancelCoverDialog(): void {
  coverPicked.value = null
  coverDialog.value = false
}

function cropProfileImage(): void {
  const result = refProfileCropper.value.getResult()
  const croppedImage = result.canvas.toDataURL('image/jpg')
  centred.value.profileUrl = croppedImage
  profileDialog.value = false
}

function cancelProfileDialog(): void {
  profilePicked.value = null
  profileDialog.value = false
}

watch(cover, (newCoverFiles) => {
  const newCover = newCoverFiles[0]
  coverPicked.value = URL.createObjectURL(newCover)
  coverDialog.value = true
})

watch(profile, (newProfileFiles) => {
  const newCover = newProfileFiles[0]
  profilePicked.value = URL.createObjectURL(newCover)
  profileDialog.value = true
})

watch(
  () => centred.value,
  (newValue, oldValue) => {
    if (oldValue !== null && !isObjectEmpty(oldValue)) {
      centredHasChange.value = true
    }
  },
  { deep: true },
)
</script>

<template>
  <!-- https://codesandbox.io/s/vue-advanced-cropper-basic-jfy5w?file=/src/App.vue -->
  <main>
    <div class="q-px-xl">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <!-- Cover -->
        <BaseCard flat>
          <BaseCardSection horizontal>
            <BaseImage :source="centred.coverUrl" :ratio="9 / 3" label="Cover" />
            <BaseCardActions vertical class="justify-around">
              <q-input
                ref="coverInputName"
                style="display: none"
                v-model="cover"
                type="file"
                label="Standard"
              />
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                @click="() => coverInputName.$el.click()"
              ></q-btn>
            </BaseCardActions>
          </BaseCardSection>
        </BaseCard>
        <!-- Cover cropper -->
        <BaseDialog v-model="coverDialog">
          <ImageCropper
            :image-source="coverPicked"
            :image-size="{
              width: 500,
              height: 200,
            }"
            @on-crop="cropCoverImage"
            @on-cancel="cancelCoverDialog"
            @on-image-change="updateCoverRef"
          />
        </BaseDialog>

        <!-- Business Image -->
        <div class="column items-center">
          <div class="col">
            <BaseCard flat>
              <BaseCardSection horizontal>
                <div class="column items-center">
                  <div class="col">
                    <BaseAvatar
                      v-if="centred.profileUrl"
                      :image="centred.profileUrl"
                      size="200px"
                      label="Logo"
                    />
                  </div>
                </div>
                <BaseCardActions vertical class="justify-around">
                  <q-input
                    ref="profileInputName"
                    style="display: none"
                    v-model="profile"
                    type="file"
                    label="Standard"
                  />
                  <q-btn
                    flat
                    round
                    color="primary"
                    icon="edit"
                    @click="() => profileInputName.$el.click()"
                  ></q-btn>
                </BaseCardActions>
              </BaseCardSection>
            </BaseCard>
          </div>
        </div>

        <!-- Profile cropper -->
        <BaseDialog v-model="profileDialog">
          <ImageCropper
            :image-source="profilePicked"
            :image-size="{
              width: 300,
              height: 300,
            }"
            @on-crop="cropProfileImage"
            @on-cancel="cancelProfileDialog"
            @on-image-change="updateProfileRef"
          />
        </BaseDialog>

        <!-- Business Name -->
        <q-input
          filled
          v-model="centred.shortName"
          label="Negocio *"
          hint="Nombre de tu negocio"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Por favor, ingrese el nombre del negocio']"
        />

        <!-- Business Description -->
        <q-input
          filled
          v-model="centred.summary"
          label="Descripción *"
          hint="Descripción de tu negocio"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor, ingrese la descripción del negocio',
          ]"
        />
        <div class="col" align="right">
          <q-btn label="Publish" type="submit" color="primary" :disable="!centredHasChange" />
        </div>
      </q-form>
    </div>
  </main>
</template>
