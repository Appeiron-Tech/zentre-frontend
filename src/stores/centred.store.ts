import type { IContact, ICentred } from '@/models/centred/Centred.interface'
import { School } from '@/models/centred/School.class'
import type { IBasicProfile, ISns } from '@/models/centred/School.interface'
import CentredService from '@/services/centred/Centred.service'
import SchoolService from '@/services/centred/School.service'
import { defineStore } from 'pinia'

const centredService = new CentredService()
const schoolService = new SchoolService()
export const useCentredStore = defineStore('centred', {
  state: () => ({
    centred: {} as ICentred,
  }),
  getters: {
    getCentredVerbose(state) {
      return state.centred
    },
    getBasicProfile(state) {
      const basicProfile: IBasicProfile = {
        summary: state.centred.schools[0].summary,
        shortName: state.centred.schools[0].shortName,
        coverUrl: state.centred.schools[0].coverUrl,
        profileUrl: state.centred.schools[0].profileUrl,
      }
      return basicProfile
    },
    getContact(state) {
      const address = state.centred.schools[0]?.address ?? ''
      const contact: IContact = {
        ...state.centred.schools[0].contact,
        address,
      }
      return contact
    },
    getSns(state) {
      return state.centred.schools[0].sns
    },
  },
  actions: {
    async fetch(centredId: string): Promise<void> {
      this.centred = await centredService.getCentred(centredId)
    },

    async updateBasicProfile(basicProfile: IBasicProfile) {
      const schoolId = this.centred.schools[0].id
      this.centred.schools[0] = await schoolService.updateSchool(schoolId, basicProfile)
    },

    async updateContact(contact: IContact) {
      const schoolId = this.centred.schools[0].id
      this.centred.schools[0] = await schoolService.updateSchool(schoolId, { contact })
    },

    async updateSns(sns: ISns[]) {
      const schoolId = this.centred.schools[0].id
      const snsDB = School.parseToSnsDB(sns)
      //We manage the parse here instead of the service because the updateSchool method is generic for any school property.
      //If we wanted to manage the parse in the service, we would need to create separate update methods for each case.
      this.centred.schools[0] = await schoolService.updateSchool(schoolId, { sns: snsDB })
    },
  },
})
