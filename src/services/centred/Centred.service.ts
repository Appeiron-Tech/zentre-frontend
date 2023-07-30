import ApiService from '@/models/ApiService'
import type { ICentred, ICentredUpdate } from '@/models/centred/Centred.interface'
import type { ICentredService } from './CentredService.interface'
import { removeUndefined } from '@/utils/parses'

export default class CentredService extends ApiService implements ICentredService {
  constructor() {
    super({ baseURL: '/centred' })
  }

  async getCentred(centredId: string): Promise<ICentred> {
    let centred = null
    try {
      centred = (await this.get(`/${centredId}`)).data
    } catch (e) {
      console.log(e)
    }
    return centred
  }

  async updateCentred(centreId: string, centred: ICentredUpdate): Promise<ICentred> {
    centred = removeUndefined(centred)
    console.log('sending: ' + centreId)
    console.log('body: ')
    console.log(JSON.stringify(centred))
    try {
      return (await this.patch(`/${centreId}`, centred)).data
    } catch (e) {
      console.log(e)
      throw new Error('Centred can not be updated')
    }
    // return centredUpdated
  }
}
