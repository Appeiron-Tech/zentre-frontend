import type { ISchool } from './School.interface'

export interface ICentredDB {
  id: string
  tenancyName: string
  country: string
  type: string
  currencyName: string
  ga_email_analytics: string
  apps: ICentredApp[]
  schools: ISchool[]
  updatedAt: Date
  createdAt: Date
}

export interface ICentred {
  id: string
  tenancyName: string
  country: string
  type: string
  currencyName: string
  ga_email_analytics: string
  apps: ICentredApp[]
  schools: ISchool[]
  updatedAt: Date
  createdAt: Date
}

export interface ICentredUpdate {
  tenancyName?: string
  country?: string
  type?: string
  currencyName?: string
  ga_email_analytics?: string
  apps?: ICentredApp[]
}

export interface IContact {
  phones: string[]
  emails: string[]
  address: string
  website: string
}

export interface ICentredApp {
  app: string
  plan: string
}

export interface IPhone {
  countryCode: string
  phone: string
}
