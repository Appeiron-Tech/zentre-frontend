import ApiService from '@/models/ApiService'
import type { ICourseService } from './CourseService.interface'
import type { ICourse, ICourseUpdate } from '@/models/course/Course.interface'
import { removeUndefined } from '@/utils/parses'

export default class CourseService extends ApiService implements ICourseService {
  constructor() {
    super({ baseURL: '/course' })
  }

  async getAllCourses(centredId: string, paramsRequest: any): Promise<ICourse[]> {
    let courses = []
    try {
      courses = (await this.get(`/`, { params: { centredId } })).data
    } catch (e) {
      console.log(e)
    }
    return courses
  }

  async getCourse(courseId: string): Promise<ICourse> {
    let course = null
    try {
      course = (await this.get(`/${courseId}`)).data
    } catch (e) {
      console.log(e)
    }
    return course
  }

  async updateCourse(rawCourse: ICourse): Promise<ICourse> {
    const toUpdateBody: ICourseUpdate = removeUndefined({
      title: rawCourse.title,
      description: rawCourse.description,
      language: rawCourse.language,
      level: rawCourse.level,
      category: rawCourse.category,
      subCategory: rawCourse.subCategory,
      price: rawCourse.price,
      currency: rawCourse.currency,
      duration: rawCourse.duration,
      durationUnit: rawCourse.durationUnit,
    })

    try {
      rawCourse = (await this.patch(`/${rawCourse.id}`, toUpdateBody)).data
    } catch (e) {
      console.log(e)
    }
    return rawCourse
  }
}
