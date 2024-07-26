import type { IContact } from './Company.interfaces'

export type IStore = IStoreDB

export interface IStoreDB {
  id: string
  name: string
  description: string
  address?: string
  logoUrl?: string
  coverUrl?: string
  isMain: boolean
  latitude?: number
  longitude?: number
  cityId?: number
  sns?: ISns[]
  isOpenAlways: boolean
  openingHours: IOpeningHour[]
  contact: IContact
  isActive: boolean
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

export type IBasicStore = Pick<IStore, 'name' | 'description' | 'coverUrl' | 'logoUrl'>

export interface ISnsDB {
  code: string
  url: string
  show: boolean
}

export interface IOpeningHour {
  weekDay: number
  from: string
  to: string
}

export interface ISns extends ISnsDB {
  icon: string
  name: string
}
