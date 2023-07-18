import type { ISchool } from './School.interface'

export interface ICentred {
  id: string
  tenancyName: string
  officialName: string
  country: string
  type: string
  favicon: string
  currencyName: string
  ga_email_analytics: string
  ga_view_id: string
  ga_api_key: string
  apps: ICentredApp[]
  schools: ISchool[]
  updatedAt: Date
  createdAt: Date
}

export interface ICentredUpdate {
  tenancyName: string
  officialName: string
  country: string
  type: string
  favicon: string
  currencyName: string
  ga_email_analytics: string
  ga_view_id: string
  ga_api_key: string
  apps: ICentredApp[]
}

export interface ICentredApp {
  app: string
  plan: string
}
