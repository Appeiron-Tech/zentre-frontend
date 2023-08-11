import type { IContact } from './Centred.interface'
import type { ISchool, ISchoolDB } from './School.interface'

export class School implements ISchool {
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

  constructor(schoolDB: ISchoolDB) {
    this.id = schoolDB.id
    this.centredId = schoolDB.centredId
    this.coverUrl = schoolDB.coverUrl
    this.profileUrl = schoolDB.profileUrl
    this.officialName = schoolDB.officialName
    this.shortName = schoolDB.shortName
    this.summary = schoolDB.summary
    this.address = schoolDB.address
    this.country = schoolDB.country
    this.type = schoolDB.type
    this.contact = schoolDB.contact
    this.favicon = schoolDB.favicon
    this.currency = schoolDB.currency
    this.updatedAt = schoolDB.updatedAt
    this.createdAt = schoolDB.createdAt
  }

  // private static parseContact(contactDB: IContact): IContact {
  //   const contact: IContact = {
  //     ...contactDB,
  //     phones: contactDB.phones.map((rawPhone) => {
  //       const phoneElements = rawPhone.split(' ')
  //       return {
  //         countryCode: phoneElements[0],
  //         number: phoneElements[1],
  //         fullNumber: rawPhone,
  //       } as IPhone
  //     }),
  //   }
  //   return contact
  // }
}
