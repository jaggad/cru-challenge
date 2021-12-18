import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { observer } from 'mobx-react'
import { topBarStyles } from './TopBar.style'
import { useStore } from '@lib/store'
import { TopBarProps } from './TopBar.model'

/**
 * A TopBar Component for the root document layout
 *
 * @param props contains the global store
 * @returns A JSX Element
 */
const TopBar: React.FC<TopBarProps> = (props) => {
  const { config } = useStore(props.store)

  return (
    <AppBar position="fixed" sx={topBarStyles}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          CRU Rostering - {config.location}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default observer(TopBar)
