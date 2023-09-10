export interface IUserCreate {
  uid: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  isAnonymous: boolean
  phoneNumber: string | null
  photoURL: string | null
  centredId: string
  lastLoginAt: Date
}

export interface IUser {
  id: string
  uid: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  isAnonymous: boolean
  phoneNumber: string | null
  photoURL: string | null
  centredId: string
  lastLoginAt: Date
  createdAt: Date
}
