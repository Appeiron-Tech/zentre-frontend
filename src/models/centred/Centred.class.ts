import type { ICentred, ICentredApp, ICentredDB } from './Centred.interface'
import { School } from './School.class'
import type { ISchool } from './School.interface'

export class Centred implements ICentred {
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

  constructor(centredDB: ICentredDB) {
    this.id = centredDB.id
    this.tenancyName = centredDB.tenancyName
    this.country = centredDB.country
    this.type = centredDB.type
    this.ga_email_analytics = centredDB.ga_email_analytics
    this.currencyName = centredDB.currencyName
    this.apps = centredDB.apps
    this.schools = centredDB.schools.map((schoolDB) => new School(schoolDB))
    this.updatedAt = centredDB.updatedAt
    this.createdAt = centredDB.createdAt
  }
}
