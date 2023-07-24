import type { ICentred, ICentredUpdate } from '@/models/centred/Centred.interface'
import { defineStore } from 'pinia'
// import { isObjectEmpty } from '@/utils/validators'
import CentredService from '@/services/centred/centred.service'

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
      const courseService = new CentredService()
      this.centred = await courseService.getCentred(centredId)
    },

    update(centred: ICentredUpdate) {
      console.log('updating Centred')
    },
  },
})
