import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../test-utils'
import CategoryCard from '~/components/category-card/CategoryCard'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}))

vi.mock('~/services/category-icon-service', () => ({
  getCategoryIcon: () => {
    return () => <div data-testid='icon' />
  }
}))

describe('InfoCard component', () => {
  const props = {
    id: 1,
    icon: 'learnImg',
    title: 'Languages',
    totalOffers: '234',
    color: '#79B260',
    to: '/subjects'
  }

  it('should contain image', () => {
    renderWithProviders(<CategoryCard {...props} />)

    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
  })

  it('should have correct title', () => {
    renderWithProviders(<CategoryCard {...props} />)

    const text = screen.getByText(props.title)
    expect(text).toBeInTheDocument()
  })

  it('should have correct description', () => {
    renderWithProviders(<CategoryCard {...props} />)

    const text = screen.getByText('categoriesPage.totalOffers')
    expect(text).toBeInTheDocument()
  })

  it('should navigate to the provided path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<CategoryCard {...props} />} path='/' />
          <Route element={<p>subjects page</p>} path={props.to} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(/subjects/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('icon'))

    await waitFor(() => {
      expect(screen.getByText(/subjects/i)).toBeInTheDocument()
    })
  })
})
