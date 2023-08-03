import type {
  ICentred,
  ICentredApp,
  ICentredDB,
  IContact,
  IContactDB,
  IPhone,
} from './Centred.interface'
import type { ISchool } from './School.interface'

export class Centred implements ICentred {
  id: string
  tenancyName: string
  summary: string
  coverUrl: string
  profileUrl: string
  officialName: string
  shortName: string
  country: string
  type: string
  contact: IContact
  favicon: string
  currencyName: string
  ga_email_analytics: string
  apps: ICentredApp[]
  schools: ISchool[]
  updatedAt: Date
  createdAt: Date

  constructor(centredDB: ICentredDB) {
    this.id = centredDB.id
    this.tenancyName = centredDB.tenancyName
    this.summary = centredDB.summary
    this.coverUrl = centredDB.coverUrl
    this.profileUrl = centredDB.profileUrl
    this.officialName = centredDB.officialName
    this.shortName = centredDB.shortName
    this.country = centredDB.country
    this.type = centredDB.type
    this.ga_email_analytics = centredDB.ga_email_analytics
    this.contact = this.parseContact(centredDB.contact)
    this.favicon = centredDB.favicon
    this.currencyName = centredDB.currencyName
    this.apps = centredDB.apps
    this.schools = centredDB.schools
    this.updatedAt = centredDB.updatedAt
    this.createdAt = centredDB.createdAt
  }

  private parseContact(contactDB: IContactDB): IContact {
    const contact: IContact = {
      ...contactDB,
      phones: contactDB.phones.map((rawPhone) => {
        const phoneElements = rawPhone.split(' ')
        return {
          countryCode: phoneElements[0],
          number: phoneElements[1],
          fullNumber: rawPhone,
        } as IPhone
      }),
    }
    return contact
  }
}
