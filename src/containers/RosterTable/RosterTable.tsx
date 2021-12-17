import * as React from 'react'
import {
  addDays,
  differenceInCalendarDays,
  format,
  getDay,
  differenceInHours,
} from 'date-fns'
import { DataGrid } from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import { RosterTableProps } from './RosterTable.model'
import { useStore } from '@lib/store'

import employees from '../../../api/employees.json'
import shifts from '../../../api/shifts.json'
import roles from '../../../api/roles.json'
import { getShiftType } from './getShiftType'

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ]

const RosterTable: React.FC<RosterTableProps> = ({ store }) => {
  const { startDate, endDate } = useStore(store)

  const daysBetweenLength =
    Math.abs(differenceInCalendarDays(startDate, endDate)) || 1

  const dayColumns = Array.from({ length: daysBetweenLength }, (_, i) => ({
    field: i,
    headerName: `${format(addDays(startDate, i), 'EEE')} - ${getDay(
      addDays(startDate, i)
    )}`,
    width: 100,
  }))

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'roles',
      headerName: 'Position Title',
      width: 150,
    },
    ...dayColumns,
  ]

  const rows = employees.map((e) => {
    const employeeShifts = shifts
      .filter((shift) => shift.employee_id === e.id)
      .map((shift) => {
        const start = new Date(shift.start_time)
        const end = new Date(shift.end_time)

        return {
          startDay: getDay(start),
          endDay: getDay(end),
          shiftType: getShiftType(start),
          shiftDuration: differenceInHours(end, start),
          break_duration: shift.break_duration,
          id: shift.id,
          role_id: shift.role_id,
        }
      })

    const employeeRoles = [...new Set(employeeShifts.map((e) => e.role_id))]
    const employeeRoleNames = employeeRoles.map(
      (r) => roles.find((role) => role.id === r)?.name
    )

    const shiftsByDay = employeeShifts.reduce(
      (a, v) => ({ ...a, [v.startDay]: v.shiftType }),
      {}
    )

    // const shiftsByDay = {
    //   employeeShifts.map((s) => {
    //     return {
    //       [s.startDay]: {
    //         ...s,
    //       },
    //     }
    //   }),
    // }

    console.log('shiftsByDay', shiftsByDay)

    return {
      id: e.id,
      name: `${e.first_name} ${e.last_name}`,
      roles: employeeRoleNames.join(', '),
      ...shiftsByDay,
    }
  })

  console.log('rows', rows)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20, 50, 100]}
      />
    </div>
  )
}

export default observer(RosterTable)
