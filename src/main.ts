import { createApp } from 'vue'
import { Quasar } from 'quasar'

import App from './App.vue'

// Plugins
import router from './plugins/router'
import quasarUserOptions from './plugins/quasar/quasar-user-options'

// Style
import '@/styles/base.css'

// Singletons
import appController from '@/controller/Controller'

const app = createApp(App)

app.use(router)
app.use(Quasar, quasarUserOptions)
app.provide('appController', appController)
app.mount('#app')
