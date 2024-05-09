import { screen, fireEvent } from '@testing-library/react'
import { expect, vi } from 'vitest'
import CategoriesTitleInput from '~/containers/categories-title-input/CategoriesTitleInput'
import { renderWithProviders } from '~tests/test-utils'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { useAxios } from '~/hooks/use-axios'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: vi.fn()
  }
})

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

// TODO: Add this block when <CategoriesResultsNotFound> will be on develop branch
/*vi.mock('~/containers/categories-results-not-found/CategoriesResultsNotFound', () => ({
    __esModule: true,
    default: () => <div data-testid='results-not-found'></div>
}))*/

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: () => <div data-testid='title-description'></div>
}))

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ data_testid, onClick }) => (
    <button data-testid={data_testid} onClick={onClick}></button>
  )
}))

vi.mock('~/hooks/use-axios', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useAxios: vi.fn().mockReturnValue({
      loading: false,
      fetchData: vi.fn(),
      response: { items: [] },
      error: null
    })
  }
})

const navigate = vi.fn()
useNavigate.mockReturnValue(navigate)

const mockResponse = {
  items: [
    {
      _id: 1,
      name: 'Music',
      img: 'img.png',
      title: 'Music',
      totalOffers: {
        student: 5,
        tutor: 5
      }
    }
  ],
  count: 5
}

describe('CategoriesTitleInput container', () => {
  beforeEach(() => {
    renderWithProviders(<CategoriesTitleInput />)
  })

  it('should redirect to "find offers" page when "Show all offers" button is clicked', async () => {
    fireEvent.click(screen.getByTestId(`button-show-all`))
    assert(() => {
      expect(navigate).toHaveBeenCalledWith(authRoutes.findOffers.route)
    })
  })

  it('should perform search when "Search" button is clicked', async () => {
    const fetchData = vi.fn()
    const mockFetchData = vi.fn().mockImplementationOnce(() => mockResponse)
    useAxios.mockImplementation(({ onResponse }) => ({
      loading: false,
      fetchData: () => {
        onResponse(mockFetchData())
      }
    }))

    fireEvent.click(screen.getByTestId('button-search'))
    assert(() => {
      expect(fetchData).toHaveBeenCalled()
      expect(screen.getAllByTestId('card')).toBeInTheDocument
    })
  })
})
