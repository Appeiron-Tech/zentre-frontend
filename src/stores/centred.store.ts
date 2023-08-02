import type {
  ICentred,
  ICentredBasicProfile,
  ICentredContact,
} from '@/models/centred/Centred.interface'
import CentredService from '@/services/centred/Centred.service'
import { defineStore } from 'pinia'

const courseService = new CentredService()
export const useCentredStore = defineStore('centred', {
  state: () => ({
    centred: {} as ICentred,
  }),
  getters: {
    getCentredVerbose(state) {
      return state.centred
    },
    getBasicProfile(state) {
      const basicProfile: ICentredBasicProfile = {
        summary: state.centred.summary,
        shortName: state.centred.shortName,
        coverUrl: state.centred.coverUrl,
        profileUrl: state.centred.profileUrl,
      }
      return basicProfile
    },
    getContact(state) {
      // const address = state.centred.schools[0]?.address ?? ''
      const address = ''
      const contact: ICentredContact = {
        ...state.centred.contact,
        address,
      }
      return contact
    },
  },
  actions: {
    async fetch(centredId: string): Promise<void> {
      console.log('calling fetch centred')
      this.centred = await courseService.getCentred(centredId)
    },

    async updateBasicProfile(centred: ICentredBasicProfile) {
      this.centred = await courseService.updateCentred(this.centred.id, centred)
    },

    async updateContact(contact: ICentredContact) {
      this.centred = await courseService.updateCentred(this.centred.id, { contact })
    },
  },
})
