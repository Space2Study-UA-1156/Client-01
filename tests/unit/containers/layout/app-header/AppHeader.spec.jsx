import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import AppHeader from '~/containers/layout/app-header/AppHeader'

vi.mock('~/containers/layout/navbar/NavBar', () => ({
  __esModule: true,
  default: () => <div>NavBar</div>
}))

describe('AppHeader container', () => {
  it('should render toolbar', () => {
    renderWithProviders(<AppHeader />)

    const toolbar = screen.getByTestId('toolbar')

    expect(toolbar).toBeInTheDocument()
  })
})
