import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../test-utils'
import CategoryCard from '~/components/category-card/CategoryCard'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { vi } from 'vitest'

vi.mock('~/components/img-title-description/ImgTitleDescription', () => ({
  __esModule: true,
  default: ({ img, title, description }) => (
    <div>
      <img alt={title} src={img} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}))

describe('InfoCard component', () => {
  const props = {
    id: 1,
    img: 'learnImg.png',
    title: 'Languages',
    totalOffers: '234'
  }

  it('should contain image', () => {
    renderWithProviders(<CategoryCard {...props} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
  })

  it('should have correct title', () => {
    renderWithProviders(<CategoryCard {...props} />)

    const text = screen.getByText(props.title)
    expect(text).toBeInTheDocument()
  })

  it('should have correct description', () => {
    renderWithProviders(<CategoryCard {...props} />)

    const text = screen.getByText(`${props.totalOffers} categoriesPage.offers`)
    expect(text).toBeInTheDocument()
  })

  it('should navigate to the provided path', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<CategoryCard {...props} />} path='/' />
          <Route
            element={<p>subjects page</p>}
            path={`${authRoutes.subjects.path}/:id`}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByText(/subjects/i)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('img'))

    await waitFor(() => {
      expect(screen.getByText(/subjects/i)).toBeInTheDocument()
    })
  })
})
