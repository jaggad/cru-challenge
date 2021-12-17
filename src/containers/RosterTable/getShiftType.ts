import { getHours } from 'date-fns'

type ShiftType = 'Morning' | 'Day' | 'Evening' | 'Night'

export const getShiftType = (shiftStartTime: Date): ShiftType => {
  const hours = getHours(shiftStartTime)
  if (hours <= 12) {
    return 'Morning'
  }

  if (hours <= 15) {
    return 'Day'
  }

  if (hours <= 18) {
    return 'Evening'
  }

  return 'Night'
}
