import type { IContact } from './Centred.interface'

export interface ISchool {
  id: string
  centredId: string
  coverUrl: string
  profileUrl: string
  officialName: string
  shortName: string
  summary: string
  address: string
  country: string
  type: string
  contact: IContact
  favicon: string
  currency: string
  updatedAt: Date
  createdAt: Date
}

export interface ISchoolDB {
  id: string
  centredId: string
  coverUrl: string
  profileUrl: string
  officialName: string
  shortName: string
  summary: string
  address: string
  country: string
  type: string
  contact: IContact
  favicon: string
  currency: string
  updatedAt: Date
  createdAt: Date
}

export interface ISchoolUpdate {
  address?: string
  country?: string
  type?: string
  contact?: IContact
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
