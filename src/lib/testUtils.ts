import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

/**
 * Wraps any react children in passed providers or mocks for testing
 *
 * @param chidren react element
 * @returns children elements wrapped in providers
 */
const Providers = ({ children }: { children: ReactElement }) => {
  return children
}

/**
 * Render UI components with passed Providers as wrapper
 *
 * @param ui UI React Component
 * @param options React testing library rendering options
 * @returns a rendered testable React component
 */
const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
