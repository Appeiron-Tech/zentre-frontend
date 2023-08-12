import ApiService from '@/models/ApiService'
import { removeUndefined } from '@/utils/parses'
import type { ISchool, ISchoolDB, ISchoolUpdate } from '@/models/centred/School.interface'
import { School } from '@/models/centred/School.class'
import type { ISchoolService } from './SchoolService.interface'

export default class SchoolService extends ApiService implements ISchoolService {
  constructor() {
    super({ baseURL: '/school' })
  }

  async getSchool(schoolId: string): Promise<ISchool> {
    try {
      const dbSchool = (await this.get(`/${schoolId}`)).data as ISchoolDB
      return new School(dbSchool)
    } catch (e) {
      console.error(e)
      throw new Error('school api call error')
    }
  }

  async updateSchool(schoolId: string, school: ISchoolUpdate): Promise<ISchool> {
    school = removeUndefined(school)
    console.log('sending: ' + schoolId)
    console.log('body: ')
    console.log(JSON.stringify(school))
    try {
      // const dbUpdatedSchool = (await this.patch(`/${schoolId}`, school)).data as ISchoolDB
      const dbUpdatedSchool = (await this.get(`/${schoolId}`)).data as ISchoolDB
      return new School(dbUpdatedSchool)
    } catch (e) {
      console.log(e)
      throw new Error('Centred can not be updated')
    }
  }
}
