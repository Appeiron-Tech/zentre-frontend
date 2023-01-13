export function formattedDate(date: Date, hasHour?: boolean): string {
  if (date) {
    const splittedDate = date.toISOString().split('T')
    const _date = splittedDate[0]
    let _hour = ''
    if (hasHour) {
      _hour = splittedDate[1]?.split('.')[0] || ''
    }
    return hasHour ? _date + ' ' + _hour : _date
  }
  return ''
}

export function getEndOfDate(offsetDate?: Date): Date {
  const finishDate = offsetDate ? new Date(offsetDate.getTime()) : new Date()
  finishDate.setHours(23, 59, 59, 999)
  return finishDate
}