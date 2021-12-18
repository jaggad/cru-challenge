import styled from '@emotion/styled'
import { Box } from '@mui/system'
import { ROLE_CLASS_BASE } from '@lib/theme'
import roles from '../../api/roles.json'

const roleColours = roles.map(
  (role) =>
    `.${ROLE_CLASS_BASE}${role.id} { 
      color: ${role.text_colour}; 
      background-color: ${role.background_colour}; 
    }`
)

export const GridContainer = styled(Box)`
  width: 100%;

  .shift-cell {
    cursor: pointer;
  }

  .MuiDataGrid-cell,
  .MuiDataGrid-row {
    min-height: 2.5rem !important;
    max-height: 2.5rem !important;
    line-height: 2.5rem !important;
  }

  ${roleColours}
`
