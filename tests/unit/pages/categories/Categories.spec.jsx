import { screen } from '@testing-library/react'
import { vi } from 'vitest'

import Categories from '~/pages/categories/Categories'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/containers/create-request-offer/CreateRequestOffer', () => ({
  __esModule: true,
  default: () => <div data-testid='create-request' />
}))

vi.mock('~/containers/categories-title-input/CategoriesTitleInput', () => ({
  __esModule: true,
  default: () => <div data-testid='categories-title-input' />
}))

vi.mock('~/containers/category-list-wrapper/CategoryListWrapper', () => ({
  __esModule: true,
  default: () => <div data-testid='category-list-wrapper' />
}))

describe('Categories', () => {
  it('renders correctly', async () => {
    renderWithProviders(<Categories />)

    expect(screen.getByTestId('create-request')).toBeInTheDocument()
    expect(screen.getByTestId('categories-title-input')).toBeInTheDocument()
    expect(screen.getByTestId('category-list-wrapper')).toBeInTheDocument()
  })
})
