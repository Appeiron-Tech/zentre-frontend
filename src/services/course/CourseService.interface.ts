import type { ICourse } from '@/models/course/Course.interface'

export interface ICourseService {
  getCourses(centredId: string, paramsRequest: any): Promise<ICourse[]>
  getCourse(courseId: string): Promise<ICourse>
  updateCourse(rawCourse: ICourse): Promise<ICourse>
}
