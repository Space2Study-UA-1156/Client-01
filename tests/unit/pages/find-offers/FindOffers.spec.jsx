import { screen } from '@testing-library/react'
import FindOffers from '~/pages/find-offers/FindOffers'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

describe('FindOffers component', () => {
  it('renders the Find Offers page', async () => {
    renderWithProviders(<FindOffers />)
    expect(await screen.findByText('Find offers')).toBeInTheDocument()
  })
})
