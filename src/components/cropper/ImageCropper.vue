<script lang="ts" setup>
import { Cropper } from 'vue-advanced-cropper'
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
  <div>
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
    <hr class="solid" >
    <div>
      <button @click="$emit('onCancel')">Cancel</button>
      <button @click="$emit('onCrop')">Crop image</button>
    </div>
  </div>
</template>

<style>
.cropper {
  min-height: 300px;
  width: 100%;
}
hr.solid {
  border-top: 3px solid #bbb;
}
</style>
