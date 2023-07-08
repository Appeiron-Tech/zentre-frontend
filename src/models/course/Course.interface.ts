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
  updatedAt: Date
  createdAt: Date
}
