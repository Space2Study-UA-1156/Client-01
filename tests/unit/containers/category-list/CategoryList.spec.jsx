import { fireEvent, screen } from '@testing-library/react'
import { expect, vi } from 'vitest'
import CategoryList from '~/containers/category-list/CategoryList'
import useAxios from '~/hooks/use-axios'
import { renderWithProviders } from '../../../test-utils'

vi.mock('~/components/category-card/CategoryCard', () => ({
  __esModule: true,
  default: ({ img, title, totalOffers }) => (
    <div data-testid='card'>
      <img alt={title} src={img} />
      <h2>{title}</h2>
      <p>{totalOffers}</p>
    </div>
  )
}))

vi.mock(
  '~/containers/categories-results-not-found/CategoriesResultsNotFound',
  () => ({
    __esModule: true,
    default: () => <div data-testid='not-found' />
  })
)

vi.mock('~/components/loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid='loader'></div>
}))

vi.mock('~/hooks/use-axios')

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: () => [{ get: vi.fn() }, vi.fn()]
  }
})

const mockFirstResponse = {
  items: [
    {
      _id: 1,
      name: 'Languages',
      title: 'Languages',
      appearance: {
        color: '#79B260',
        icon: 'learnImg.png'
      },
      totalOffers: {
        student: 234,
        tutor: 234
      }
    }
  ],
  count: 24
}
const mockSecondResponse = {
  items: [
    {
      _id: 2,
      name: 'Languages',
      title: 'Languages',
      appearance: {
        color: '#79B260',
        icon: 'learnImg.png'
      },
      totalOffers: {
        student: 234,
        tutor: 234
      }
    }
  ],
  count: 24
}

describe('CategoryList container', () => {
  it('should render "Sorry, no results found"', () => {
    const fakeData = {
      loading: false,
      fetchData: () => vi.fn()
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<CategoryList />)

    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  it('should render Loader', () => {
    const fakeData = {
      loading: true,
      fetchData: vi.fn()
    }
    useAxios.mockImplementation(() => fakeData)
    renderWithProviders(<CategoryList />)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('should render more cards after "View more" button click', () => {
    const mockFetchData = vi
      .fn()
      .mockImplementationOnce(() => mockFirstResponse)
      .mockImplementationOnce(() => mockSecondResponse)
    useAxios.mockImplementation(({ onResponse }) => ({
      loading: false,
      fetchData: () => {
        onResponse(mockFetchData())
      }
    }))
    renderWithProviders(<CategoryList />)

    expect(screen.getAllByTestId('card')).toHaveLength(1)

    fireEvent.click(screen.getByText('categoriesPage.viewMore'))

    expect(screen.getAllByTestId('card')).toHaveLength(2)
  })

  it('"View more" button should disappear if there are no more cards to display', () => {
    const mockFetchData = vi
      .fn()
      .mockImplementationOnce(() => mockFirstResponse)
      .mockImplementationOnce(() => ({
        items: [],
        count: 0
      }))
    useAxios.mockImplementation(({ onResponse }) => ({
      loading: false,
      fetchData: () => {
        onResponse(mockFetchData())
      }
    }))
    renderWithProviders(<CategoryList />)

    const btn = screen.getByText('categoriesPage.viewMore')
    expect(btn).toBeInTheDocument()
    fireEvent.click(btn)
    expect(btn).not.toBeInTheDocument()
  })
})
