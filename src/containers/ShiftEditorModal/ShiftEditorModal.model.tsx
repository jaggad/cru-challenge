import { IStore } from '@lib/store'

export interface ShiftEditorModalProps {
  store?: IStore
}

export type ShiftType = 'Morning' | 'Day' | 'Evening' | 'Night'

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
  startDay: number
  endDay: number
  shiftType: ShiftType
  shiftDuration: number
  breakDuration: number
  role: EmployeeRole
}
