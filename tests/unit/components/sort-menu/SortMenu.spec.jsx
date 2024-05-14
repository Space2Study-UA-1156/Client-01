import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import SortMenu from '~/components/sort-menu/SortMenu'
import { expect, vi } from 'vitest'
import { renderWithProviders } from '~tests/test-utils'

const defaultHandleChange = vi.fn(() => ['newest', defaultHandleChange])

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      switch (key) {
        case 'findOffers.sortTitles.newest':
          return 'Newest'
        case 'findOffers.sortTitles.rating':
          return 'Rating'
        case 'findOffers.sortTitles.priceAsc':
          return 'Price: Low to High'
        case 'findOffers.sortTitles.priceDesc':
          return 'Price: High to Low'
        default:
          return key
      }
    }
  })
}))

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ data_testid, children }) => (
    <button data-testid={data_testid}>{children}</button>
  )
}))

vi.mock('@mui/material/Select', () => {
  const Select = ({ children, onChange, value, ...props }) => {
    const [selectedValue, setSelectedValue] = React.useState(value)
    const handleChange = (event) => {
      setSelectedValue(event.target.value)
      onChange && onChange(event)
    }
    return (
      <div role='combobox' {...props} data-value={selectedValue}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            onClick: () =>
              handleChange({ target: { value: child.props.value } })
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

describe('SortMenu', () => {
  it('dropdown appears with 4 sorting options when sort button is clicked', () => {
    renderWithProviders(<SortMenu />)
    const selectElement = screen.getByRole('combobox')

    fireEvent.mouseDown(selectElement)

    expect(screen.getByTestId('button-newest')).toHaveTextContent('Newest')
    expect(screen.getByTestId('button-rating')).toHaveTextContent('Rating')
    expect(screen.getByTestId('button-priceAsc')).toHaveTextContent(
      'Price: Low to High'
    )
    expect(screen.getByTestId('button-priceDesc')).toHaveTextContent(
      'Price: High to Low'
    )
  })

  it('handleChange is called with correct value', () => {
    const handleChange = vi.fn()
    renderWithProviders(<SortMenu handleChange={handleChange} />)

    const selectElement = screen.getByRole('combobox')

    fireEvent.mouseDown(selectElement)

    const ratingOption = screen.getByTestId('button-rating')
    fireEvent.click(ratingOption)

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'rating' } })
    )
  })

  it('default value is set to Newest', () => {
    renderWithProviders(<SortMenu />)
    expect(screen.getByTestId('button-newest')).toBeInTheDocument()
  })

  it('calls defaultHandleChange when no handleChange is provided', () => {
    renderWithProviders(<SortMenu />)

    const selectElement = screen.getByRole('combobox')
    fireEvent.mouseDown(selectElement)

    const ratingOption = screen.getByTestId('button-rating')
    fireEvent.click(ratingOption)

    expect(selectElement).toHaveAttribute('data-value', 'rating')
  })
})
