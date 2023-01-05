export interface IHours {
  id: number
  fromHour: string
  toHour: string
}

export interface IOpeningHour {
  weekDay: number
  hours: IHours[]
}

export interface IOpeningHours {
  storeId: number
  openingHours: IOpeningHour[]
}
