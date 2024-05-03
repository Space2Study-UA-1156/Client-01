import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../test-utils'
import CategoryCard from '~/components/category-card/CategoryCard'

describe('InfoCard component', () => {
  const props = {
    id: 1,
    img: 'learnImg.png',
    title: 'Languages',
    totalOffers: '234'
  }

  beforeEach(() => {
    renderWithProviders(<CategoryCard {...props} />)
  })

  it('should contain image', () => {
    const img = screen.getByRole('img')

    expect(img).toBeInTheDocument()
  })

  it('should have correct title', () => {
    const text = screen.getByText(props.title)

    expect(text).toBeInTheDocument()
  })

  it('should have correct description', () => {
    const text = screen.getByText(`${props.totalOffers} categoriesPage.offers`)

    expect(text).toBeInTheDocument()
  })
})
