import type { IContact, ICompany } from '@/models/company/Company.interfaces'
import { parseToSnsDB } from '../models/company/Store.class'
import type { IBasicStore, ISns } from '../models/company/Store.interface'
import CompanyService from '@/services/company/Company.service'
import StoreService from '@/services/company/Store.service'
import { defineStore } from 'pinia'

const companyService = new CompanyService()
const storeService = new StoreService()
export const useCompanyStore = defineStore('company', {
  state: () => ({
    company: {} as ICompany,
  }),
  getters: {
    getCompany(state) {
      if (!state.company.id) {
        const localCompany = localStorage.getItem('company')
        if (localCompany) {
          state.company = JSON.parse(localCompany) as ICompany
        } else {
          console.log('there is not company on LS')
        }
      }
      return state.company
    },
    getBasicStore(state) {
      const basicStore: IBasicStore = {
        description: state.company.stores[0].description,
        name: state.company.stores[0].name,
        coverUrl: state.company.stores[0].coverUrl,
        logoUrl: state.company.stores[0].logoUrl,
      }
      return basicStore
    },
    getContact(state) {
      const address = state.company.stores[0]?.address ?? ''
      const contact: IContact = {
        ...state.company.stores[0].contact,
        address,
      }
      return contact
    },
    getSns(state) {
      return state.company.stores[0].sns ?? []
    },
  },
  actions: {
    async fetch(companyId: string): Promise<void> {
      this.company = await companyService.getById(companyId)
      localStorage.setItem('company', JSON.stringify(this.company))
    },

    async updateBasicStore(basicStore: IBasicStore) {
      const schoolId = this.company.stores[0].id
      this.company.stores[0] = await storeService.updateStore(schoolId, basicStore)
    },

    async updateContact(contact: IContact) {
      const storeId = this.company.stores[0].id
      this.company.stores[0] = await storeService.updateStore(storeId, { contact })
    },

    async updateSns(sns: ISns[]) {
      const storeId = this.company.stores[0].id
      const snsDB = parseToSnsDB(sns)
      //We manage the parse here instead of the service because the updateSchool method is generic for any school property.
      //If we wanted to manage the parse in the service, we would need to create separate update methods for each case.
      this.company.stores[0] = await storeService.updateStore(storeId, { sns: snsDB })
    },
  },
})
