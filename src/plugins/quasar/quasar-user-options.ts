// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/themify/themify.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

import {Notify, Loading, Dialog} from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Notify,
    Loading,
    Dialog,
  },
  config: {
    brand: {
      primary: '#5484ea',
      secondary: '#55e396',
      accent: '#7ef3e2',

      dark: '#1d1d1d',

      positive: '#0059ff',
      negative: '#f01430',
      info: '#e2f1fe',
      warning: '#fceebb'
    },
    notify: { /* look at QuasarConfOptions from the API card */ },
    loading: { /* look at QuasarConfOptions from the API card */ },
    dialog:{},
  },
}
