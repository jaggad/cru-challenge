import * as React from 'react'
import Link from 'next/link'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import { sideBarStyles } from './SideBar.style'
import { NavItem } from './SideBar.models'

const MainNavItems: NavItem[] = [
  { text: 'Rostering', icon: <CropSquareIcon /> },
  { text: 'Timetable', icon: <CropSquareIcon /> },
]

/**
 * A SideBar Component for the root document layout
 *
 * @returns A JSX Element
 */
export default function SideBar() {
  return (
    <Drawer sx={sideBarStyles} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <ListSection items={MainNavItems} />
    </Drawer>
  )
}

/**
 * A list section for the SideBar root component
 *
 * @param items A list of NavItem objects
 * @returns A JSX Element
 */
export const ListSection = ({ items }: { items: NavItem[] }) => (
  <List>
    {items.map((props, i) => (
      <RouteListItem key={props.text} index={i} {...props} />
    ))}
  </List>
)

/**
 * A list item which can act as a Next Router link
 *
 * @param items parameters of NavItem, plus the index tracker
 * @returns A JSX Route Connected ListItem Element
 */
export const RouteListItem = ({ href, index, icon, text }: NavItem) => (
  <Link href={href || '#'} passHref>
    <ListItem button component={'a'} data-testid={`list-linkitem-${index}`}>
      <ListItemIcon data-testid={`list-icon-${index}`}>{icon}</ListItemIcon>
      <ListItemText primary={text} data-testid={`list-text-${index}`} />
    </ListItem>
  </Link>
)
