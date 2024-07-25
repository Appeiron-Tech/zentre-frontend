export interface IUserCreate {
  uid: string
  companyId: string
  email: string | null
  displayName: string | null
  emailVerified: boolean
  isAnonymous: boolean
  phoneNumber: string | null
  photoURL: string | null
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
  companyId: string
  lastLoginAt: Date
  createdAt: Date
}
