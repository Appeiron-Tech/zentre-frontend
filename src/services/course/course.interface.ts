import type { IAPIReq } from '../shared/api.interface'

export interface IGetCoursesReq extends IAPIReq {
  params?: {
    category: string,
    subCategory?: string
  }
}
