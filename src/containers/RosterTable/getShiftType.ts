import { getHours, isValid } from 'date-fns'
import { ShiftType } from './RosterTable.model'

export const getShiftType = (shiftStartTime: Date): ShiftType => {
  // Return fallback if date is not a valid input
  if (!isValid(shiftStartTime)) {
    return 'N/A'
  }

  const hours = getHours(shiftStartTime)

  console.log('hrs:', hours)

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
