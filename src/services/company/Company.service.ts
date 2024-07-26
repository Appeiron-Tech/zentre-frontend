import ApiService from '@/models/ApiService'
import type { ICompany, ICompanyDB, ICompanyUpdate } from '@/models/company/Company.interfaces'
import { removeUndefined } from '@/utils/parses'
import { parseToReadCompany } from '@/models/company/Company.parser'

export default class CompanyService extends ApiService {
  constructor() {
    super({ baseURL: '/company' })
  }

  async getById(companyId: string): Promise<ICompany> {
    try {
      const companyDB = (await this.get(`/${companyId}`)).data as ICompanyDB
      return parseToReadCompany(companyDB)
    } catch (e) {
      console.error(e)
      throw new Error('company api call error')
    }
  }

  async update(companyId: string, company: ICompanyUpdate): Promise<ICompany> {
    company = removeUndefined(company)
    console.log('sending: ' + companyId)
    console.log('body: ')
    console.log(JSON.stringify(company))
    try {
      const updatedCompanyDB = (await this.patch(`/${companyId}`, company)).data
      return parseToReadCompany(updatedCompanyDB)
    } catch (e) {
      console.log(e)
      throw new Error('Centred can not be updated')
    }
  }
}
