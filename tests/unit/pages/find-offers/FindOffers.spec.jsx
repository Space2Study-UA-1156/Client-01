import { fireEvent, screen } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import { vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'
import { student, tutor } from '~/constants'
import FindOffers from '~/pages/find-offers/FindOffers'

const mockSetSearchParams = vi.fn()
const useSelectorMock = vi.spyOn(reactRedux, 'useSelector')

vi.mock('react-router-dom', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    useSearchParams: () => [{ get: vi.fn() }, mockSetSearchParams]
  }
})

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => <div>{children}</div>)
}))

vi.mock('~/components/app-content-switcher/AppContentSwitcher', () => ({
  default: ({ onChange }) => (
    <input data-testid='switcher' onChange={onChange} />
  )
}))

describe('FindOffers component', () => {
  it('renders the Find Offers page', async () => {
    renderWithProviders(<FindOffers />)
    expect(await screen.findByText('Find offers')).toBeInTheDocument()
  })

  it('should set search params on switcher change (tutor)', () => {
    useSelectorMock.mockReturnValue({ userRole: student })
    renderWithProviders(<FindOffers />)
    const switcher = screen.getByTestId('switcher')
    mockSetSearchParams.mockClear()

    fireEvent.change(switcher, { target: { value: 'test' } })

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      view: 'list',
      role: tutor
    })
  })

  it('should set search params on switcher change (student)', () => {
    useSelectorMock.mockReturnValue({ userRole: tutor })
    renderWithProviders(<FindOffers />)
    const switcher = screen.getByTestId('switcher')
    mockSetSearchParams.mockClear()

    fireEvent.change(switcher, { target: { value: 'test' } })

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      view: 'list',
      role: student
    })
  })
})
