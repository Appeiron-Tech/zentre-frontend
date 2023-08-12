import { SNS_DEFAULT_VALUES } from '@/constants'
import type { IContact } from './Centred.interface'
import type { ISchool, ISchoolDB, ISns, ISnsDB } from './School.interface'

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
  sns: ISns[]
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
    this.sns = this.parseSns(schoolDB.sns)
    this.favicon = schoolDB.favicon
    this.currency = schoolDB.currency
    this.updatedAt = schoolDB.updatedAt
    this.createdAt = schoolDB.createdAt
  }

  private parseSns(snsDB: ISnsDB[]) {
    return Object.keys(SNS_DEFAULT_VALUES).map((sn) => {
      const snDB = snsDB.find((snDB) => snDB.code === sn)
      if (snDB) {
        return {
          ...snDB,
          name: SNS_DEFAULT_VALUES[sn].name,
          icon: SNS_DEFAULT_VALUES[sn].icon,
        } as ISns
      } else {
        return {
          code: sn,
          url: '',
          show: false,
          name: SNS_DEFAULT_VALUES[sn].name,
          icon: SNS_DEFAULT_VALUES[sn].icon,
        } as ISns
      }
    })
  }

  public static parseToSnsDB(sns: ISns[]): ISnsDB[] {
    const snsDB = sns
      .filter((sn) => sn.url.length)
      .map((sn) => {
        return {
          code: sn.code,
          url: sn.url,
          show: sn.show,
        } as ISnsDB
      })
    return snsDB
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
