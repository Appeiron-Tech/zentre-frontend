export const maxLength = (val: string, length: number) =>
  val && val.length > 0 && val.length <= length

export const minLength = (val: string, length: number) => val && val.length <= length
