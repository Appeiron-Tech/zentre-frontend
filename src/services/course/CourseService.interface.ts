import type { ICourse } from '@/models/course/Course.interface'
import type { IAPIReq } from '../shared/api.interface'

export interface ICourseService {
  getAllCourses(request: IAPIReq): Promise<ICourse[]>
}

// type BatchCreatePaymentBatchRequest = AuthRequest<
//   never,
//   IPayableBatch,
//   { payablesIds: string[]; productId: string },
//   never
// >;
