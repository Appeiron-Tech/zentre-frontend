<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
import 'vue-advanced-cropper/dist/style.css'
import { ref, watch } from 'vue'
defineProps({
  imageSource: {
    type: String,
    required: true,
  },
  imageSize: {
    type: Object,
  },
})
const imageRef = ref('parentImageRef')
const emit = defineEmits(['onImageChange', 'onCrop', 'onCancel'])
watch(imageRef, () => {
  emit('onImageChange', imageRef.value)
})
</script>

<template>
  <BaseCard>
    <Cropper
      ref="imageRef"
      :src="imageSource"
      :stencil-size="imageSize"
      :stencil-props="{
        handlers: {},
        movable: false,
        resizable: false,
      }"
      image-restriction="stencil"
    />
    <q-separator dark />
    <BaseCardSection align="right">
      <q-btn flat color="secondary" icon="cancel" @click="$emit('onCancel')">Cancel</q-btn>
      <q-btn flat color="primary" icon="aspect_ratio" @click="$emit('onCrop')">Crop image</q-btn>
    </BaseCardSection>
  </BaseCard>
</template>

<style>
.Cropper {
  min-height: 300px;
  width: 100%;
}
</style>
