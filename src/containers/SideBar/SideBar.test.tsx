import React, { ReactChildren } from 'react'
import { render, cleanup } from '../../lib/testUtils'
import { ListSection } from './SideBar'
import { NavItem } from './SideBar.models'

afterEach(cleanup)

it('should render an array of list items with text and icons', () => {
  const items: NavItem[] = [
    { text: 'Test item 1', icon: <i /> },
    { text: 'Test item 2', icon: <i /> },
  ]

  const { getByTestId } = render(<ListSection items={items} />)

  // Expect list to contain all list items with text
  expect(getByTestId('list-text-0').textContent).toEqual(items[0].text)
  expect(getByTestId('list-text-1').textContent).toEqual(items[1].text)

  // Expect list item to contain icon tags (represented by i)
  expect(getByTestId('list-icon-0').childElementCount).toEqual(1)
  expect(getByTestId('list-icon-0').firstElementChild?.tagName).toEqual('I')
})

it('should not render an array of list items if empty', () => {
  const items: NavItem[] = []

  const { queryByTestId } = render(<ListSection items={items} />)

  expect(queryByTestId('list-text-0')).not.toBeInTheDocument()
  expect(queryByTestId('list-icon-0')).not.toBeInTheDocument()
})

it('changes value when clicked', () => {
  jest.mock('next/link', () => {
    return ({ children }: { children: ReactChildren }) => {
      return children
    }
  })

  const items: NavItem[] = [
    { text: 'Test item 1', icon: <i />, href: '/#testRoute' },
  ]

  const { getByTestId } = render(<ListSection items={items} />)

  // get a hold of the button element, and trigger some clicks on it
  const link = getByTestId('list-linkitem-0')

  expect(link).toBeTruthy()
  expect(link.tagName).toBe('A')
  expect(link).toHaveAttribute('href')
})
