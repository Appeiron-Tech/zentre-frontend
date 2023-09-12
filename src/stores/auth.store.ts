import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  type Auth,
  type User as GUser,
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import UserService from '@/services/user/User.service'
import type { IUser } from '@/models/user/User.interface'

const auth = useFirebaseAuth() as Auth
const userService = new UserService()
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      data: {} as IUser,
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
        const providerUser: GUser = response.user
        const createdUser = await userService.createUser(providerUser, '6498a94e213a7fc800781e1a')
        if (createdUser) {
          this.user.data = createdUser
          // const currentUser = await getCurrentUser()
          if (auth.currentUser) {
            await sendEmailVerification(auth.currentUser)
          }
        }
      } else {
        throw new Error('Unable to register user')
      }
    },
    async signInWithEmailAndPassword(email: string, password: string) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        const providerUser: GUser = response.user
        const loggedInUser = await userService.loginUser(providerUser.uid)
        this.user.data = loggedInUser
      } else {
        throw new Error('login failed')
      }
    },
  },
})
