import { renderWithProviders } from '~tests/test-utils'
import CategoriesResultsNotFound from '~/containers/categories-results-not-found/CategoriesResultsNotFound'
import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      switch (key) {
        case 'constant.resultsNotFound':
          return 'Results Not Found'
        case 'constant.tryAgainText':
          return 'Try again with category'
        case 'constant.buttonRequest':
          return 'Request New Category'
        default:
          return key
      }
    }
  })
}))

const imgAltMock = 'info'
const imgSrcMock = '/src/assets/img/guest-home-page/howItWorksStudentSecond.svg'
const requestNewCategory = vi.fn()

vi.mock('~/components/img-title-description/ImgTitleDescription', () => ({
  __esModule: true,
  default: () => (
    <div>
      <img alt={imgAltMock} src={imgSrcMock} />
      <h2>Results Not Found</h2>
      <p>Try again with category</p>
    </div>
  )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ onClick }) => (
    <button onClick={onClick}>Request New Category</button>
  )
}))

describe('CategoriesResultsNotFound tests', () => {
  beforeEach(() => {
    renderWithProviders(<CategoriesResultsNotFound />)
  })

  it('Image, title and description should be correct', () => {
    const actualTitle = screen.getByText('Results Not Found')
    const actualDescription = screen.getByText('Try again with category')
    const imgElement = screen.getByAltText(imgAltMock)

    expect(actualTitle).toBeInTheDocument()
    expect(actualDescription).toBeInTheDocument()
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', imgSrcMock)
  })

  it('Button should be present with correct text', () => {
    const buttonElement = screen.getByText('Request New Category')

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent('Request New Category')
  })

  it('Button should call function requestNewCategory when AppButton is clicked', async () => {
    fireEvent.click(screen.getByText('Request New Category'))

    assert(() => {
      expect(requestNewCategory).toHaveBeenCalled
    })
  })
})
