import ApiService from '@/models/ApiService'
import type { ICourseService } from './CourseService.interface'
import type { ICourse } from '@/models/course/Course.interface'
import type { IGetCoursesReq } from './course.interface'

export default class CourseService extends ApiService implements ICourseService {
  constructor() {
    super({ baseURL: '/course' })
  }

  /**
   *
   * @returns
   */
  async getAllCourses(request: IGetCoursesReq): Promise<ICourse[]> {
    let courses = []
    try {
      courses = (await this.get('/', request)).data
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
}
