import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type Auth,
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth() as Auth
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      loggedIn: false,
      data: {},
    },
  }),
  getters: {
    getUser(state) {
      return state.user
    },
  },
  actions: {
    async register(email: string, password: string) {
      console.log('On register with: ' + email + ' - ' + password)
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        console.log(response.user)
        this.user.data = response.user
      } else {
        throw new Error('Unable to register user')
      }
    },
    async logIn(email: string, password: string) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        this.user.data = response.user
      } else {
        throw new Error('login failed')
      }
    },
  },
})

// import { defineStore } from 'pinia'
// import { ref } from 'vue'
// import router from '../router'
// import myFetch from '../helpers/myFetch'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: ref({}),
//     message: ref(''),
//   }),
//   getters: {
//     userFirstName: (state) => {
//       if (state.user.name) {
//         return state.user.name.charAt(0).toUpperCase() + state.user.name.slice(1)
//       }
//     },
//   },
//   actions: {
//     async register(createdName, createdUserName, createdPassword) {
//       const body = { createdName, createdUserName, createdPassword }
//       myFetch('register', 'POST', body).then((res) => {
//         if (res.response.value.message) {
//           this.message = res.response.value.message
//         } else {
//           this.user = res.response.value
//           router.push('/')
//         }
//       })
//     },

//     async login(username, password) {
//       const body = { username, password }
//       myFetch('login', 'POST', body).then((res) => {
//         this.user = res.response.value.user
//         // redirect to home page
//         router.push('/')
//       })
//     },
//     logout() {
//       // reset store to original state
//       this.$reset()
//       router.push('/')
//     },
//   },
//   greeting: {
//     enabled: false,
//   },
// })
