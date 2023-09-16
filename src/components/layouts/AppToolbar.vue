<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps(['drawer'])
const emit = defineEmits(['update:drawer'])

const drawer = computed({
  get() {
    return props.drawer
  },
  set(values) {
    emit('update:drawer', values)
  },
})
const mobileData = ref(false)
const bluetooth = ref(false)

function logout(): void {
  console.log('login out')
}
</script>

<template>
  <q-toolbar>
    <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
    <q-toolbar-title>Z E N T R E</q-toolbar-title>
    <q-btn-dropdown label="Account Settings">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="mobileData" label="Dark Mode" />
          <q-toggle v-model="bluetooth" label="Bluetooth" />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn color="primary" label="Logout" push size="sm" v-close-popup @click="logout" />
        </div>
      </div>
    </q-btn-dropdown>
  </q-toolbar>
</template>
