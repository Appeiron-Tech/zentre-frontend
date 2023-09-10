import ApiService from '@/models/ApiService'
import type { IUserService } from './UserService.interface'
import type { IUser, IUserCreate } from '@/models/user/User.interface'
import type { User as GUser } from 'firebase/auth'

export default class UserService extends ApiService implements IUserService {
  constructor() {
    super({ baseURL: '/user' })
  }

  async createUser(rawUser: GUser, centredId: string): Promise<IUser> {
    try {
      const userToCreate: IUserCreate = {
        uid: rawUser.uid,
        email: rawUser.email,
        displayName: rawUser.displayName,
        emailVerified: rawUser.emailVerified,
        isAnonymous: rawUser.isAnonymous,
        phoneNumber: rawUser.phoneNumber,
        photoURL: rawUser.photoURL,
        centredId: centredId,
        lastLoginAt: new Date(rawUser.metadata.lastSignInTime ?? ''),
      }
      const createdUserResponse = await this.post(`/`, userToCreate)
      return createdUserResponse.data
    } catch (e) {
      console.log(e)
      throw new Error('Unable to save in DB')
    }
  }
}
