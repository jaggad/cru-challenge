import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: { children: ReactElement }) => {
  return children
}

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
