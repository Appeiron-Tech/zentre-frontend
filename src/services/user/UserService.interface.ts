import type { IUser } from '@/models/user/User.interface'
import type { User as GUser } from 'firebase/auth'

export interface IUserService {
  createUser(request: GUser, companyId: string): Promise<IUser>
  loginUser(userUid: string): Promise<IUser>
}
