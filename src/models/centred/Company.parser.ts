import type { ICompany, ICompanyDB } from './Company.interfaces'
import { parseToStoreRead } from './School.class'

export function parseToReadCompany(rawCompany: ICompanyDB): ICompany {
  const company: ICompany = {
    ...rawCompany,
    stores: rawCompany.stores.map((storeDB) => parseToStoreRead(storeDB)),
  }
  return company
}
