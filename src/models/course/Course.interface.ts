export interface ICourse {
  id: string
  centredId: string
  title: string
  description: string
  language: string
  level: string
  category: string
  subCategory?: string
  price: number
  currency: string
  duration?: number
  durationUnit?: string
  isActive?: boolean
  updatedAt: Date
  createdAt: Date
}

export interface ICourseUpdate {
  title?: string
  description?: string
  language?: string
  level?: string
  category?: string
  subCategory?: string
  isActive?: boolean
  price?: number
  currency?: string
  duration?: number
  durationUnit?: string
}

export interface ICourseCreate {
  title: string
  description: string
  category: string
}
