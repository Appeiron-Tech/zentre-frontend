<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2">
      <q-header elevated class="primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Z E N T R E</q-toolbar-title>
        </q-toolbar>
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

            <q-item clickable v-ripple to="/content">
              <q-item-section avatar>
                <q-icon name="space_dashboard" />
              </q-item-section>
              <q-item-section>Contenido</q-item-section>
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
        <q-page padding class="containerBackground">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)
const miniState = ref(true)
</script>

<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0

.containerBackground
    background-color: #F6F6F6
</style>
