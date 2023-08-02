import type { ISchool } from './School.interface'

export interface ICentred {
  id: string
  tenancyName: string
  summary: string
  coverUrl: string
  profileUrl: string
  officialName: string
  shortName: string
  country: string
  type: string
  contact: ICentredContact
  favicon: string
  currencyName: string
  ga_email_analytics: string
  apps: ICentredApp[]
  schools: ISchool[]
  updatedAt: Date
  createdAt: Date
}

export interface ICentredUpdate {
  tenancyName?: string
  summary?: string
  officialName?: string
  shortName?: string
  coverUrl?: string
  profileUrl?: string
  country?: string
  type?: string
  contact?: ICentredContact
  favicon?: string
  currencyName?: string
  ga_email_analytics?: string
  apps?: ICentredApp[]
}

export interface ICentredBasicProfile {
  summary?: string
  shortName?: string
  coverUrl?: string
  profileUrl?: string
}

export interface ICentredContact {
  phones: string[]
  emails: string[]
  address: string
  website: string
}

export interface ICentredApp {
  app: string
  plan: string
}
