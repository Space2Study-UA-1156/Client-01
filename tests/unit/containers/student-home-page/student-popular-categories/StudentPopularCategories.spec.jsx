import { vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import StudentPopularCategories from '~/containers/student-home-page/student-popular-categories/StudentPopularCategories'
import { authRoutes } from '~/router/constants/authRoutes'

const navigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid='title-with-description' />)
}))

vi.mock('~/containers/category-list/CategoryList', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid='category-list' />)
}))

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: vi.fn(({ onClick }) => (
    <div data-testid='app-button' onClick={onClick} />
  ))
}))

describe('StudentPopularCategories', () => {
  it('renders correctly', () => {
    render(<StudentPopularCategories />)
    const title = screen.getByTestId('title-with-description')
    const categoryList = screen.getByTestId('category-list')
    const button = screen.getByTestId('app-button')

    expect(title).toBeInTheDocument()
    expect(categoryList).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should navigate to Categories', () => {
    render(<StudentPopularCategories />)
    const button = screen.getByTestId('app-button')

    fireEvent.click(button)

    expect(navigate).toHaveBeenCalledWith(authRoutes.categories.path)
  })
})
