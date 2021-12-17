import React from 'react'
import { render, screen } from '@lib/testUtils'
import IndexPage from '@pages/index'

describe('IndexPage', () => {
  it('should render the heading', () => {
    render(<IndexPage />)

    // const heading = screen.getByText(/Base work for CRU Challenge/i)

    // we can only use toBeInTheDocument because it was imported
    // in the jest.setup.js and configured in jest.config.js
    // expect(heading).toBeInTheDocument()
  })
})
