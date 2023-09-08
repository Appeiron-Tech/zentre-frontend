import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'

import App from './App.vue'

// Plugins
import router from './plugins/router'
import quasarUserOptions from './plugins/quasar/quasar-user-options'
import i18n from './plugins/i18n/i18n'

// Style
import '@/styles/base.css'

// Singletons
import appController from '@/controller/Controller'
import { firebaseApp } from './plugins/firebase/firebaseApp'
import { VueFire, VueFireAuth } from 'vuefire'

const app = createApp(App)

app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(i18n)
app.use(createPinia())
app.use(Quasar, quasarUserOptions)
app.provide('appController', appController)
app.mount('#app')
