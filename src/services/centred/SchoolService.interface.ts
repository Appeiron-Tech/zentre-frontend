import type { ISchool, ISchoolUpdate } from '@/models/centred/School.interface'

export interface ISchoolService {
  // getSchool(schoolId: string): Promise<ISchool>
  updateSchool(schoolId: string, schoolToUpdate: ISchoolUpdate): Promise<ISchool>
}
