import { vi } from 'vitest'
import { fireEvent, screen } from '@testing-library/react'
import AppPagination from '~/components/app-pagination/AppPagination'
import { renderWithProviders } from '~tests/test-utils'

const handleChange = vi.fn()

describe('AppPagination', () => {
  it('should render the AppPagination component when pageCount is greater than 1', () => {
    renderWithProviders(<AppPagination page={2} pageCount={5} />)
    const appPagination = screen.getByTestId('app-pagination')
    expect(appPagination).toBeInTheDocument()
  })
  it('should not render the AppPagination component when pageCount is 1 or less', () => {
    renderWithProviders(<AppPagination page={1} pageCount={1} />)
    const appPagination = screen.queryByTestId('app-pagination')
    expect(appPagination).toBeNull()
  })
  it('should call handleChange when user changes page', () => {
    renderWithProviders(
      <AppPagination onChange={handleChange} page={2} pageCount={5} />
    )
    const thirdPageButton = screen.getByLabelText('Go to page 3')
    fireEvent.click(thirdPageButton)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
