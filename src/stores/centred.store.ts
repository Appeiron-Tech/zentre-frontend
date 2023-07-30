import type {
  ICentred,
  ICentredUpdate,
  ICentredBasicProfile,
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
  },
  actions: {
    async fetch(centredId: string): Promise<void> {
      this.centred = await courseService.getCentred(centredId)
    },

    async updateBasicProfile(centred: ICentredBasicProfile) {
      const courseService = new CentredService()
      this.centred = await courseService.updateCentred(this.centred.id, centred)
    },
  },
})
