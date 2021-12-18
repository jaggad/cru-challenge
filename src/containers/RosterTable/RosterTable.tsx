import * as React from 'react'
import {
  addDays,
  differenceInCalendarDays,
  format,
  getDay,
  differenceInHours,
} from 'date-fns'
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  MuiEvent,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import {
  EmployeeShiftData,
  RoleData,
  RosterTableProps,
} from './RosterTable.model'
import { useStore } from '@lib/store'
import { getShiftType } from './getShiftType'
import { GridContainer } from './RosterTable.styles'
import { ROLE_CLASS_BASE } from '@lib/theme'

// API Data
import employees from '../../api/employees.json'
import roles from '../../api/roles.json'

const RosterTable: React.FC<RosterTableProps> = ({ store }) => {
  const { startDate, endDate, shifts, handleOpen } = useStore(store)

  const TOTAL_TABLE_WIDTH = 780
  const daysBetweenLength =
    Math.abs(differenceInCalendarDays(startDate, endDate)) || 1

  // Generate dynamic number of columns based on date range
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dayColumns: GridColumns = Array.from(
    { length: daysBetweenLength },
    (_, i) => ({
      field: i.toString(),
      headerName: `${format(addDays(startDate, i), 'EEE')} ${format(
        addDays(startDate, i),
        `dd/MM`
      )}`,
      width: TOTAL_TABLE_WIDTH / daysBetweenLength,
      type: 'string',
      valueFormatter: (params: GridCellParams) => {
        return params?.value?.shiftType
      },
    })
  )

  // Join dynamic day columns to core column set
  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'roles',
      headerName: 'Position Title',
      width: 220,
    },
    ...dayColumns,
  ]

  // Generate rows from "API" data
  const rows = employees.map((e) => {
    const employeeShifts: EmployeeShiftData[] = shifts
      .filter((shift) => shift.employee_id === e.id)
      .map((shift) => {
        const start = new Date(shift.start_time)
        const end = new Date(shift.end_time)
        const role = roles.find((role: RoleData) => shift.role_id === role.id)

        return {
          startDay: getDay(start),
          endDay: getDay(end),
          shiftType: getShiftType(start),
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
      })

    // Get set of roles employee fills
    const employeeRoles = [...new Set(employeeShifts.map((e) => e.role.name))]

    // Organise shifts by day index
    const shiftsByDay = employeeShifts.reduce((a, v) => ({
      ...a,
      [v.startDay]: v,
    }))

    // Return column field values
    return {
      name: `${e.first_name} ${e.last_name}`,
      roles: employeeRoles.join(', '),
      ...shiftsByDay,
      id: e.id,
    }
  })

  return (
    <GridContainer>
      <DataGrid
        autoHeight={true}
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20, 50, 100]}
        getCellClassName={(params: GridCellParams<EmployeeShiftData>) => {
          const roleId = params?.value?.role?.id
          const isShiftCell =
            typeof params?.value?.shiftType !== 'undefined' ? 'shift-cell' : ''

          // Return role classe
          if (typeof roleId === 'undefined') {
            return ''
          }

          return `${ROLE_CLASS_BASE}${roleId} ${isShiftCell}`
        }}
        onCellClick={(
          params: GridCellParams,
          event: MuiEvent<React.MouseEvent>
        ) => {
          event.defaultMuiPrevented = true
          console.log('popup:', params)
          handleOpen(params.value.id)
        }}
      />
    </GridContainer>
  )
}

export default observer(RosterTable)
