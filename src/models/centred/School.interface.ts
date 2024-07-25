import type { IContact } from './Company.interfaces'

export interface IStore {
  id: string
  companyId: string
  coverUrl: string
  profileUrl: string
  officialName: string
  shortName: string
  summary: string
  address: string
  country: string
  type: string
  contact: IContact
  sns: ISns[]
  favicon: string
  currency: string
  updatedAt: Date
  createdAt: Date
}

export interface IStoreDB {
  id: string
  companyId: string
  coverUrl: string
  profileUrl: string
  officialName: string
  shortName: string
  summary: string
  address: string
  country: string
  type: string
  contact: IContact
  sns: ISnsDB[]
  favicon: string
  currency: string
  updatedAt: Date
  createdAt: Date
}

export interface IStoreUpdate {
  address?: string
  country?: string
  type?: string
  contact?: IContact
  sns?: ISnsDB[]
  currency?: string
  summary?: string
  officialName?: string
  shortName?: string
  coverUrl?: string
  profileUrl?: string
  favicon?: string
}

export interface IBasicProfile {
  summary?: string
  shortName?: string
  coverUrl?: string
  profileUrl?: string
}

export interface ISnsDB {
  code: string
  url: string
  show: boolean
}

export interface ISns extends ISnsDB {
  icon: string
  name: string
}
