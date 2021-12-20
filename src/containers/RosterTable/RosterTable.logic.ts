import { convertToTimeZone } from 'date-fns-timezone'
import {
  GridCellValue,
  GridColumns,
  GridValueFormatterParams,
} from '@mui/x-data-grid'
import {
  addDays,
  differenceInCalendarDays,
  differenceInHours,
  format,
  getHours,
  isValid,
} from 'date-fns'
import {
  EmployeeShiftData,
  EmployeeShiftRow,
  RoleData,
  ShiftData,
  ShiftType,
} from './RosterTable.model'

// API Data
import employees from '../../api/employees.json'
import roles from '../../api/roles.json'

/**
 * Gets the "day period" type for a particular shift
 *
 * @param shiftStartTime A valid shift start DateTime
 * @returns The type of period for this shift
 */
export const getShiftType = (
  shiftStartTime: Date,
  timeZone: string
): ShiftType => {
  // Return fallback if date is not a valid input
  if (!isValid(shiftStartTime)) {
    return 'N/A'
  }

  const hours = getHours(convertToTimeZone(shiftStartTime, { timeZone }))

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

/**
 * Generate the columns including a dynamic number of days based
 * on a start and end date
 *
 * @param startDate a starting DateTime
 * @param endDate an ending DateTime
 */
export const generateDayColumns = (
  startDate: Date,
  endDate: Date
): GridColumns => {
  const TOTAL_TABLE_WIDTH = 780
  const daysBetweenLength =
    Math.abs(differenceInCalendarDays(startDate, endDate)) || 1

  // Generate dynamic number of columns based on date range
  return Array.from({ length: daysBetweenLength }, (_, i) => ({
    field: format(addDays(startDate, i), 'dd-MM-yyyy'),
    headerName: `${format(addDays(startDate, i), 'EEE')} ${format(
      addDays(startDate, i),
      `dd/MM`
    )}`,
    width: TOTAL_TABLE_WIDTH / daysBetweenLength,
    type: 'string',
    valueFormatter: ({ value }: GridValueFormatterParams): GridCellValue => {
      return typeof value === 'object' && value?.hasOwnProperty('shiftType')
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          value?.shiftType
        : null
    },
  }))
}

/**
 * Returns a new shift object combining role data and shift data as
 * well as calculated fields used in data display
 *
 * NOTE: Return data in an easier format to work with
 * Technically this step isn't needed, however I opted to perform this
 * In a real project I'd consider doing at an API design level or when
 * the data is initially ingested
 *
 * @param shift The API shift data
 * @returns `EmployeeShiftData` A modified shift data array combining role, shift, and calculated fields
 */
export const createShiftObject = (
  shift: ShiftData,
  timeZone: string
): EmployeeShiftData => {
  const start = convertToTimeZone(new Date(shift.start_time), { timeZone })
  const end = convertToTimeZone(new Date(shift.end_time), { timeZone })
  const role = roles.find((role: RoleData) => shift.role_id === role.id)

  return {
    startDay: format(start, 'dd-MM-yyyy'),
    endDay: format(end, 'dd-MM-yyyy'),
    shiftType: getShiftType(start, timeZone),
    shiftDuration: differenceInHours(end, start),
    breakDuration: Number(shift.break_duration) / 60,
    id: shift.id,
    role: {
      id: role?.id,
      name: role?.name,
      backgroundColor: role?.background_colour,
      textColor: role?.text_colour,
    },
  }
}

/**
 * Generate a set of rows for the roster by employee with shift and meta data
 *
 * @param shifts Employee shifts API data
 * @returns A set of rows with information for employee shifts
 */
export const generateEmployeeShiftRows = (
  shifts: ShiftData[],
  timeZone: string
): EmployeeShiftRow[] =>
  employees.map((e) => {
    // Get shifts by employee
    const employeeShifts: EmployeeShiftData[] = shifts
      .filter((shift) => shift.employee_id === e.id)
      .map((shift) => createShiftObject(shift, timeZone))

    // Get unique set of roles employee fills, comma separated
    const employeeRoles: string = [
      ...new Set(employeeShifts.map((e) => e.role.name)),
    ].join(', ')

    // Organise employee shifts by day index
    const shiftsByDay = employeeShifts.reduce((a, v) => ({
      ...a,
      [v.startDay]: v,
    }))

    // Return column field values
    return {
      name: `${e.first_name} ${e.last_name}`,
      roles: employeeRoles,
      ...shiftsByDay,
      id: e.id,
    }
  })
