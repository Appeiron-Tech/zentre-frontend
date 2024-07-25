import type { IStore } from './School.interface'

export interface ICompanyDB {
  id: string
  tenancyName: string
  country: string
  type: string
  currencyName: string
  ga_email_analytics: string
  apps: ICompanyApp[]
  stores: IStore[]
  updatedAt: Date
  createdAt: Date
}

export interface ICompany {
  id: string
  tenancyName: string
  country: string
  type: string
  currencyName: string
  ga_email_analytics: string
  apps: ICompanyApp[]
  stores: IStore[]
  updatedAt: Date
  createdAt: Date
}

export interface ICompanyUpdate {
  tenancyName?: string
  country?: string
  type?: string
  currencyName?: string
  ga_email_analytics?: string
  apps?: ICompanyApp[]
}

export interface IContact {
  phones: string[]
  emails: string[]
  address: string
  website: string
}

export interface ICompanyApp {
  app: string
  plan: string
}

export interface IPhone {
  countryCode: string
  phone: string
}
