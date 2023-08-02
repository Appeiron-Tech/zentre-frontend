<script setup lang="ts">
import { ref } from 'vue'
import BaseTab from '../../components/base/tabs//BaseTab.vue'
import BaseTabs from '../../components/base/tabs/BaseTabs.vue'
import BaseTabPanels from '../../components/base/panels/BaseTabPanels.vue'
import BaseTabPanel from '../../components/base/panels/BaseTabPanel.vue'
import BasicProfile from './basic/BasicProfile.vue'
import ContactView from './contact/ContactView.vue'

const tab = ref('basic')
</script>

<template>
  <q-page class="items-center justify-center col-12 col-md-8 col-lg-8">
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-7 q-pt-none">
        <BaseTabs v-model="tab" class="text-primary" align="justify">
          <BaseTab name="basic" icon="feed" label="Basic Info" />
          <BaseTab name="contact" icon="schedule" label="Contact" />
          <BaseTab name="sns" icon="settings_input_antenna" label="RRSS" />
        </BaseTabs>

        <BaseTabPanels
          v-model="tab"
          animated
          swipeable
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <BaseTabPanel name="basic">
            <BasicProfile />
          </BaseTabPanel>

          <!-- <q-tab-panel name="sns">
            <SnsView />
          </q-tab-panel> -->

          <BaseTabPanel name="contact">
            <ContactView />
          </BaseTabPanel>
        </BaseTabPanels>
      </div>
    </div>
  </q-page>
</template>
