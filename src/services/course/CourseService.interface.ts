import type { ICourse } from '@/models/course/Course.interface'

export interface ICourseService {
  getAllCourses(centredId: string, paramsRequest: any): Promise<ICourse[]>
  getCourse(courseId: string): Promise<ICourse>
  updateCourse(request: ICourse): Promise<ICourse>
}
