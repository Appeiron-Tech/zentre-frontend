<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { useCentredStore } from '@/stores/centred.store';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const centredStore = useCentredStore()

async function onSubmit() {
  try {
    await authStore.registerWithEmailAndPassword(username.value, password.value)
    const user = authStore.getUser
    if (user.id) {
      await centredStore.fetch(user.companyId)
      router.push({ name: 'dashboard' })
    }
  } catch (error) {
    console.error(error)
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
        <q-btn label="Register" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>
companyId