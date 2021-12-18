import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// SideBar Drawer Width
export const drawerWidth = 240
export const headerHeight = 64
export const ROLE_CLASS_BASE = 'shift-role--'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
