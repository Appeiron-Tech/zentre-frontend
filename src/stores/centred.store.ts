import type { ICentred, ICentredUpdate } from '@/models/centred/Centred.interface'
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
  },
  actions: {
    async fetch(centredId: string): Promise<void>{
      // const courseService = new CentredService()
      this.centred = await courseService.getCentred(centredId)
    },

    async update(centred: ICentredUpdate) {
      const courseService = new CentredService()
      console.log('in update')
      console.log(centred)
      this.centred = { ...this.centred, ...centred }
      this.centred = await courseService.updateCentred(this.centred.id, centred)
    },
  },
})
