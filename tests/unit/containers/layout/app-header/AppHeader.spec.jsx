import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import AppHeader from '~/containers/layout/app-header/AppHeader'

describe('AppHeader container', () => {
  it('should render toolbar', () => {
    renderWithProviders(<AppHeader />)

    const toolbar = screen.getByTestId('toolbar')

    expect(toolbar).toBeInTheDocument()
  })
})
