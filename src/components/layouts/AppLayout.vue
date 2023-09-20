<script setup lang="ts">
import { ref } from 'vue'
import AppToolbar from '@/components/layouts/AppToolbar.vue'
import { useFirebaseAuth } from 'vuefire'
import { signOut, type Auth } from 'firebase/auth'
import { useRouter } from 'vue-router'

const drawer = ref(false)
const miniState = ref(true)
const router = useRouter()

async function logout(): Promise<void> {
  const auth = useFirebaseAuth() as Auth
  await signOut(auth)
  router.push({ name: 'login' })
}
</script>

<template>
  <q-layout view="hHh Lpr lff" class="shadow-2">
    <q-header elevated class="primary">
      <AppToolbar v-model:drawer="drawer" @on-logout="logout"></AppToolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon name="analytics" />
            </q-item-section>
            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/courses">
            <q-item-section avatar>
              <q-icon name="space_dashboard" />
            </q-item-section>
            <q-item-section>Courses</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/centred">
            <q-item-section avatar>
              <q-icon name="space_dashboard" />
            </q-item-section>
            <q-item-section>Centred</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/cxentre">
            <q-item-section avatar>
              <q-icon name="sentiment_very_satisfied" />
            </q-item-section>
            <q-item-section>Customer Experience</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
