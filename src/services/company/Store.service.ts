import ApiService from '@/models/ApiService'
import { removeUndefined } from '@/utils/parses'
import { parseToStoreRead } from '@/models/centred/Store.class'
import type { IStore, IStoreUpdate } from '@/models/centred/Store.interface'

export default class StoreService extends ApiService {
  constructor() {
    super({ baseURL: '/store' })
  }

  async getStore(storeId: string): Promise<IStore> {
    try {
      const storeDB = (await this.get(`/${storeId}`)).data
      return parseToStoreRead(storeDB)
    } catch (e) {
      console.error(e)
      throw new Error('school api call error')
    }
  }

  async updateStore(storeId: string, store: IStoreUpdate): Promise<IStore> {
    store = removeUndefined(store)
    console.log('sending: ' + storeId)
    console.log('body: ')
    console.log(JSON.stringify(store))
    try {
      const updatedStoreDB = (await this.patch(`/${storeId}`, store)).data
      return parseToStoreRead(updatedStoreDB)
    } catch (e) {
      console.log(e)
      throw new Error('Store can not be updated')
    }
  }
}
