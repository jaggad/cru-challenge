import * as React from 'react'
import {
  DataGrid,
  GridCellParams,
  GridColumns,
  MuiEvent,
} from '@mui/x-data-grid'
import { observer } from 'mobx-react'
import { EmployeeShiftData, RosterTableProps } from './RosterTable.model'
import { useStore } from '@lib/store'
import {
  generateDayColumns,
  generateEmployeeShiftRows,
} from './RosterTable.logic'
import { GridContainer } from './RosterTable.styles'
import { ROLE_CLASS_BASE } from '@lib/theme'

/**
 * A Roster Table Component to display employee and shift data in a
 * visual format
 *
 * @returns A JSX Element
 */
const RosterTable: React.FC<RosterTableProps> = ({ store }) => {
  const { startDate, endDate, shifts, handleOpen } = useStore(store)

  // Generate the specificnumber of day columns
  const dayColumns = generateDayColumns(startDate, endDate)
  const rows = generateEmployeeShiftRows(shifts)

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

          // Return no calsses
          if (typeof roleId === 'undefined') {
            return ''
          }

          // Return className to indicate role type
          return `${ROLE_CLASS_BASE}${roleId} ${isShiftCell}`
        }}
        onCellClick={(
          params: GridCellParams,
          event: MuiEvent<React.MouseEvent>
        ) => {
          event.defaultMuiPrevented = true
          handleOpen(params.value.id)
        }}
      />
    </GridContainer>
  )
}

export default observer(RosterTable)
