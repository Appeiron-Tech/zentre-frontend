import ApiService from '@/models/ApiService'
import type { ICentred, ICentredDB, ICentredUpdate } from '@/models/centred/Centred.interface'
import type { ICentredService } from './CentredService.interface'
import { removeUndefined } from '@/utils/parses'
import { Centred } from '@/models/centred/Centred.class'

export default class CentredService extends ApiService implements ICentredService {
  constructor() {
    super({ baseURL: '/centred' })
  }

  async getCentred(centredId: string): Promise<ICentred> {
    try {
      const dbCentred = (await this.get(`/${centredId}`)).data as ICentredDB
      return new Centred(dbCentred)
    } catch (e) {
      console.error(e)
      throw new Error('centred api call error')
    }
  }

  async updateCentred(centreId: string, centred: ICentredUpdate): Promise<ICentred> {
    centred = removeUndefined(centred)
    console.log('sending: ' + centreId)
    console.log('body: ')
    console.log(JSON.stringify(centred))
    try {
      const dbUpdatedCentred = (await this.patch(`/${centreId}`, centred)).data as ICentredDB
      return new Centred(dbUpdatedCentred)
    } catch (e) {
      console.log(e)
      throw new Error('Centred can not be updated')
    }
  }
}
