import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  type Auth,
  type User as GUser,
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import UserService from '@/services/user/User.service'
import type { IUser } from '@/models/user/User.interface'
import { isObjectEmpty } from '@/utils/validators'

const auth = useFirebaseAuth() as Auth
const userService = new UserService()
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as IUser,
  }),
  getters: {
    getUser(state) {
      if (isObjectEmpty(state.user)) {
        const localUser = localStorage.getItem('currentUser')
        if (localUser) {
          state.user = JSON.parse(localUser) as IUser
        }
      }
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
          this.user = createdUser
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
        this.user = loggedInUser
        localStorage.setItem('currentUser', JSON.stringify(this.user))
      } else {
        throw new Error('login failed')
      }
    },
    async logout() {
      try {
        if (auth.currentUser) {
          await userService.logoutUser(auth.currentUser.uid)
        }
        await signOut(auth)
      } catch {
        throw new Error('logout DB failed')
      }
    },
    async sendPasswordResetEmail(email: string) {
      try {
        await sendPasswordResetEmail(auth, email)
      } catch (error) {
        console.error(error)
        throw new Error('Error sending email')
      }
    },
  },
})
