<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
import CalloutBox from '@/components/base/callouts/CalloutBox.vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

async function onSubmit() {
  await authStore.signInWithEmailAndPassword(username.value, password.value)
  const user = authStore.user
  if (user.id) {
    router.push({ name: 'dashboard' })
  }
}

function onReset() {
  username.value = ''
  password.value = ''
}
</script>

<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-py-lg">
      <q-input
        filled
        v-model="username"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Your password *"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
      />
      <div>
        <q-btn label="Login" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
    <CalloutBox text="Contraseña o email incorrectos" type="error" />
  </div>
</template>
