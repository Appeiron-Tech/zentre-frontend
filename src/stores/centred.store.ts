import type { IContact, ICompany } from '@/models/centred/Company.interfaces'
import { parseToSnsDB } from '../models/centred/Store.class'
import type { IDefaultStore, ISns } from '../models/centred/Store.interface'
import CompanyService from '@/services/company/Company.service'
import StoreService from '@/services/company/Store.service'
import { defineStore } from 'pinia'

const centredService = new CompanyService()
const schoolService = new StoreService()
export const useCentredStore = defineStore('centred', {
  state: () => ({
    centred: {} as ICompany,
  }),
  getters: {
    getCentred(state) {
      if (!state.centred.id) {
        const localCentred = localStorage.getItem('company')
        if (localCentred) {
          state.centred = JSON.parse(localCentred) as ICompany
        } else {
          console.log('there is not centred on LS')
        }
      }
      return state.centred
    },
    getBasicProfile(state) {
      const basicProfile: IDefaultStore = {
        summary: state.centred.stores[0].summary,
        shortName: state.centred.stores[0].shortName,
        coverUrl: state.centred.stores[0].coverUrl,
        profileUrl: state.centred.stores[0].profileUrl,
      }
      return basicProfile
    },
    getContact(state) {
      const address = state.centred.stores[0]?.address ?? ''
      const contact: IContact = {
        ...state.centred.stores[0].contact,
        address,
      }
      return contact
    },
    getSns(state) {
      return state.centred.stores[0].sns
    },
  },
  actions: {
    async fetch(centredId: string): Promise<void> {
      this.centred = await centredService.getById(centredId)
      localStorage.setItem('company', JSON.stringify(this.centred))
    },

    async updateBasicProfile(basicProfile: IDefaultStore) {
      const schoolId = this.centred.stores[0].id
      this.centred.stores[0] = await schoolService.updateStore(schoolId, basicProfile)
    },

    async updateContact(contact: IContact) {
      const schoolId = this.centred.stores[0].id
      this.centred.stores[0] = await schoolService.updateStore(schoolId, { contact })
    },

    async updateSns(sns: ISns[]) {
      const schoolId = this.centred.stores[0].id
      const snsDB = parseToSnsDB(sns)
      //We manage the parse here instead of the service because the updateSchool method is generic for any school property.
      //If we wanted to manage the parse in the service, we would need to create separate update methods for each case.
      this.centred.stores[0] = await schoolService.updateStore(schoolId, { sns: snsDB })
    },
  },
})
