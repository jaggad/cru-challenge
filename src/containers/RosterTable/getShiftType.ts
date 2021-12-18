import { getHours } from 'date-fns'
import { ShiftType } from './RosterTable.model'

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
