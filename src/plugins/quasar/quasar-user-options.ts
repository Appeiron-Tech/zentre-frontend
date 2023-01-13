// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/themify/themify.css'

// Import Quasar css
import 'quasar/dist/quasar.css'

import { Notify, Loading, Dialog } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  plugins: {
    Notify,
    Loading,
    Dialog,
  },
  config: {
    // background-image: linear-gradient(to right top, #5484ea, #00a6fc, #00c0ec, #00d5c5, #55e396);
    // Palette: #f3fafa, #44acbc, #90ebea, #b4dbe4
    brand: {
      primary: '#5484ea',
      secondary: '#ACC3F5',
      accent: '#55e396',

      dark: '#1d1d1d',

      positive: '#0059ff',
      negative: '#f01430',
      info: '#e2f1fe',
      warning: '#fceebb',
    },
    notify: {
      /* look at QuasarConfOptions from the API card */
    },
    loading: {
      /* look at QuasarConfOptions from the API card */
    },
    dialog: {},
  },
}
