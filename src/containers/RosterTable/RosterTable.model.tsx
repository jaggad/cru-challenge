import { IStore } from '@lib/store'

export interface RosterTableProps {
  store?: IStore
}

export type ShiftType = 'Morning' | 'Day' | 'Evening' | 'Night' | 'N/A'

export interface EmployeeData {
  last_name: string
  first_name: string
  id: number
}

export interface RoleData {
  background_colour: string
  name: string
  id: number
  text_colour: string
}

export interface ShiftData {
  employee_id: number
  start_time: string
  role_id: number
  end_time: string
  id: number
  break_duration: number
}

export interface EmployeeRole {
  id?: number
  name?: string
  backgroundColor?: string
  textColor?: string
}

export interface EmployeeShiftData {
  id: number
  startDay: string
  endDay: string
  shiftType: ShiftType
  shiftDuration: number
  breakDuration: number
  role: EmployeeRole
}

export interface EmployeeShiftRow {
  name: string
  roles: string
  id: number

  // Unique day ids 0 - 6 available
  0?: EmployeeShiftData
  1?: EmployeeShiftData
  2?: EmployeeShiftData
  3?: EmployeeShiftData
  4?: EmployeeShiftData
  5?: EmployeeShiftData
  6?: EmployeeShiftData
}
