<template>
  <div>
    <q-page class="items-center justify-center col-12 col-md-8 col-lg-8">
      <div class="row justify-center">
        <div class="col-12 col-md-8 col-lg-7 q-pt-none">
          <q-tabs v-model="tab" class="text-primary" align="justify">
            <q-tab name="basic" icon="feed" label="Basic Info" />
            <q-tab name="sns" icon="settings_input_antenna" label="Redes Sociales" />
            <q-tab name="contact" icon="store" label="Contact" />
            <q-tab name="hours" icon="schedule" label="Hours" />
          </q-tabs>

          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="basic">
              <BasicInfoView />
            </q-tab-panel>

            <q-tab-panel name="sns">
              <SnsView />
            </q-tab-panel>

            <q-tab-panel name="contact">
              <ContactView />
            </q-tab-panel>

            <q-tab-panel name="hours">
              <HoursView />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BasicInfoView from './basicInfo/BasicInfoView.vue'
import ContactView from './contact/ContactView.vue'
import HoursView from './hours/HoursView.vue'
import SnsView from './sns/SnsView.vue'

const tab = ref('basic')
</script>
