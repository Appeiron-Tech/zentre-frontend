import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  type Auth,
  type User as GUser,
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import UserService from '@/services/user/User.service'

const auth = useFirebaseAuth() as Auth
const userService = new UserService()
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      loggedIn: false,
      data: {} as GUser,
    },
  }),
  getters: {
    getUser(state) {
      return state.user
    },
  },
  actions: {
    async registerWithEmailAndPassword(email: string, password: string) {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        console.log(response.user)
        const providerUser: GUser = response.user
        const createdUser = await userService.createUser(providerUser, '6498a94e213a7fc800781e1a')
        if (createdUser) {
          this.user.data = response.user
          this.user.loggedIn = true
        }
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
