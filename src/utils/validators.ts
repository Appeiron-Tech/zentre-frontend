export const maxLength = (val: string, length: number) =>
  val && val.length > 0 && val.length <= length

export const minLength = (val: string, length: number) => val && val.length >= length

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObjectEmpty(object: any): boolean {
  return object && Object.keys(object).length === 0 && object.constructor === Object
}
