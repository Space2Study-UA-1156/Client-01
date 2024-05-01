import { screen } from '@testing-library/react'
import { vi } from 'vitest'

import Categories from '~/pages/categories/Categories'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

describe('Categories', () => {
  it('renders correctly', async () => {
    renderWithProviders(<Categories />)

    expect(await screen.findByText('Categories')).toBeInTheDocument()
  })
})
