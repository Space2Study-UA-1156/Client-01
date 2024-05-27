import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import SortMenu from '~/components/sort-menu/SortMenu'
import { expect, vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'

const mockSetSearchParams = vi.fn()
const mockSetSort = vi.fn()

vi.mock('react-router-dom', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    useSearchParams: () => {
      const getSpy = vi.fn()
      const toStringSpy = vi.fn()
      return [{ get: getSpy, toString: toStringSpy }, mockSetSearchParams]
    }
  }
})

vi.mock('@mui/material/Select', () => {
  const Select = ({ children, onChange, value, ...props }) => {
    return (
      <div role='combobox' {...props} data-value={value}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: () =>
              onChange && onChange({ target: { value: child.props.value } })
          })
        )}
      </div>
    )
  }
  return {
    __esModule: true,
    default: Select
  }
})

vi.mock('@mui/material/MenuItem', () => ({
  __esModule: true,
  default: ({ children, value, ...props }) => (
    <div data-value={value} role='option' {...props}>
      {children}
    </div>
  )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ data_testid, children }) => (
    <button data-testid={data_testid}>{children}</button>
  )
}))

describe('SortMenu', () => {
  it('dropdown appears with 4 sorting options when sort button is clicked', () => {
    const sort = 'newest'
    renderWithProviders(<SortMenu setSort={mockSetSort} sort={sort} />)
    const selectElement = screen.getByRole('combobox')

    fireEvent.mouseDown(selectElement)

    expect(screen.getByTestId('button-newest')).toBeInTheDocument()
    expect(screen.getByTestId('button-rating')).toBeInTheDocument()
    expect(screen.getByTestId('button-priceAsc')).toBeInTheDocument()
    expect(screen.getByTestId('button-priceDesc')).toBeInTheDocument()
  })

  it('selecting an option updates searchParams and displays the selected value', () => {
    const sort = 'newest'
    renderWithProviders(<SortMenu setSort={mockSetSort} sort={sort} />)

    const selectElement = screen.getByRole('combobox')
    fireEvent.mouseDown(selectElement)

    const ratingOption = screen.getByTestId('button-rating')
    fireEvent.click(ratingOption)

    assert(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(
        expect.objectContaining({ sort: 'rating' })
      )
      expect(mockSetSort).toHaveBeenCalledWith('rating')
      expect(screen.getByRole('combobox')).toHaveAttribute(
        'data-value',
        'rating'
      )
    })
  })
})
