<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'
import CalloutBox from '@/components/base/callouts/CalloutBox.vue'

const email = ref('')
const authStore = useAuthStore()
const isWrongPassword = ref(false)
const emailSent = ref(false)

function onSubmit() {
  try {
    authStore.sendPasswordResetEmail(email.value)
    emailSent.value = true
  } catch (error) {
    isWrongPassword.value = true
  }
}
</script>

<template>
  <div>
    <h3>Reset your password</h3>
  </div>
  <div v-if="emailSent" class="q-pa-md" style="max-width: 400px">
    <CalloutBox
      text="The email has been sent, please review your inbox email and follow the steps to reset your password"
      type="info"
    />
  </div>
  <div v-else class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" class="q-gutter-md q-py-lg">
      <div>
        <p>Enter your email address that you use with your account to continue.</p>
      </div>
      <q-input
        filled
        v-model="email"
        label="Your email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <div>
        <q-btn label="Continue" type="submit" color="primary" />
      </div>
    </q-form>
    <div>
      <CalloutBox v-if="isWrongPassword" text="There was an error sending the email" type="error" />
    </div>
  </div>
</template>
