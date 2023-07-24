import ApiService from '@/models/ApiService'
import type { ICentred } from '@/models/centred/Centred.interface'
import type { ICentredService } from './CentredService.interface'

export default class CentredService extends ApiService implements ICentredService {
  constructor() {
    super({ baseURL: '/centred' })
  }

  async getCentred(centredId: string): Promise<ICentred> {
    let centred = null
    try {
      centred = (await this.get(`/${centredId}`)).data
    } catch (e) {
      console.log(e)
    }
    return centred
  }

  async updateCentred(rawCourse: ICentred): Promise<ICentred> {
    // const toUpdateBody: ICourseUpdate = removeUndefined({
    //   title: rawCourse.title,
    //   description: rawCourse.description,
    //   language: rawCourse.language,
    //   level: rawCourse.level,
    //   category: rawCourse.category,
    //   subCategory: rawCourse.subCategory,
    //   price: rawCourse.price,
    //   currency: rawCourse.currency,
    //   duration: rawCourse.duration,
    //   durationUnit: rawCourse.durationUnit,
    // })

    // try {
    //   rawCourse = (await this.patch(`/${rawCourse.id}`, toUpdateBody)).data
    // } catch (e) {
    //   console.log(e)
    // }
    // return rawCourse
    return {} as ICentred
  }
}
