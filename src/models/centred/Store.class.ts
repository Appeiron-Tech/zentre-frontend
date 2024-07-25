import { SNS_DEFAULT_VALUES } from '@/constants'
import type { IStore, IStoreDB, ISns, ISnsDB } from './Store.interface'

export function parseToStoreRead(storeDB: IStoreDB): IStore {
  const storeRead: IStore = {
    ...storeDB,
    sns: parseSns(storeDB.sns),
  }
  return storeRead
}

function parseSns(snsDB: ISnsDB[]) {
  return Object.keys(SNS_DEFAULT_VALUES).map((sn) => {
    const snDB = snsDB.find((snDB) => snDB.code === sn)
    if (snDB) {
      return {
        ...snDB,
        name: SNS_DEFAULT_VALUES[sn].name,
        icon: SNS_DEFAULT_VALUES[sn].icon,
      } as ISns
    } else {
      return {
        code: sn,
        url: '',
        show: false,
        name: SNS_DEFAULT_VALUES[sn].name,
        icon: SNS_DEFAULT_VALUES[sn].icon,
      } as ISns
    }
  })
}

export function parseToSnsDB(sns: ISns[]): ISnsDB[] {
  const snsDB = sns
    .filter((sn) => sn.url.length)
    .map((sn) => {
      return {
        code: sn.code,
        url: sn.url,
        show: sn.show,
      } as ISnsDB
    })
  return snsDB
}
