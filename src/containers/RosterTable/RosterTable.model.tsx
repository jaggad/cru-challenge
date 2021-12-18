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
  start_time: Date
  role_id: number
  end_time: Date
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
  startDay: number
  endDay: number
  shiftType: ShiftType
  shiftDuration: number
  breakDuration: number
  role: EmployeeRole
}
