<script lang="ts" setup>
import { ref } from 'vue'
import AddSection from './components/AddSection.vue'

const showToggleCourseForm = ref(false)

function toggleCourseForm() {
  showToggleCourseForm.value = !showToggleCourseForm.value
}
</script>

<template>
  <div>
    <main>
      <div class="col-9 q-pa-md">
        <div class="q-gutter-y-md">
          <h1>Course View</h1>
          <AddSection @toggle-course-form="toggleCourseForm" />
        </div>
      </div>

      <q-dialog
        v-model="showToggleCourseForm"
        transition-show="flip-down"
        transition-hide="flip-up"
      >
        <q-card class="bg-primary text-white">
          <q-bar>
            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
            voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
            exercitationem aut, natus minima, porro labore.
          </q-card-section>
        </q-card>
      </q-dialog>
    </main>
  </div>
</template>
