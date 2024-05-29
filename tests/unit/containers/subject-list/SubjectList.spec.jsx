import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import useViewMoreMock from '~/hooks/use-view-more'
import SubjectList from '~/containers/subject-list/SubjectList'

vi.mock('~/hooks/use-view-more')

vi.mock('~/components/category-card/CategoryCard', () => ({
  default: ({ title }) => (
    <div data-testid='card' key={title}>
      {title}
    </div>
  )
}))

vi.mock('~/components/card-list/CardList', () => ({
  default: ({ cards }) => <div data-testid='card-list'>{cards}</div>
}))

vi.mock('~/components/results-not-found/ResultsNotFound', () => ({
  default: () => <div data-testid='results-not-found'>NotFound</div>
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ children, onClick, disabled }) => (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}))

const handleViewMoreMock = vi.fn()
const dataMock = [
  {
    _id: 1,
    name: 'English',
    category: { appearance: '', color: '' },
    totalOffers: {
      tutor: 0,
      student: 0
    }
  }
]

describe('SubjectList container', () => {
  it('should call handleViewMore function on button click', () => {
    useViewMoreMock.mockReturnValueOnce({
      data: dataMock,
      isViewMoreVisable: true,
      handleViewMore: handleViewMoreMock
    })
    renderWithProviders(<SubjectList />)

    const viewMoreButton = screen.getByRole('button', {
      name: 'subjectsPage.subjects.viewMore'
    })
    fireEvent.click(viewMoreButton)

    expect(handleViewMoreMock).toHaveBeenCalled()
  })

  it('should render ResultsNotFound component if there are no items to display', () => {
    useViewMoreMock.mockReturnValueOnce({
      data: [],
      loading: false,
      error: null
    })
    renderWithProviders(<SubjectList />)

    const resultsNotFound = screen.getByTestId('results-not-found')

    expect(resultsNotFound).toBeInTheDocument()
  })

  it('should render ResultsNotFound component in case of error', () => {
    useViewMoreMock.mockReturnValueOnce({
      data: dataMock,
      error: {
        status: 500,
        code: 'INTERNAL_SERVER_ERROR'
      }
    })
    renderWithProviders(<SubjectList />)

    const resultsNotFound = screen.getByTestId('results-not-found')

    expect(resultsNotFound).toBeInTheDocument()
  })

  it("should not render 'View more' button if there are no more cards to display", () => {
    useViewMoreMock.mockReturnValueOnce({
      data: dataMock,
      isViewMoreVisable: false
    })
    renderWithProviders(<SubjectList />)

    const viewMoreButton = screen.queryByRole('button', {
      name: 'subjectsPage.subjects.viewMore'
    })

    expect(viewMoreButton).toBeNull()
    expect(viewMoreButton).not.toBeInTheDocument()
  })

  it("should disable 'View more' button while loading new cards", () => {
    useViewMoreMock.mockReturnValueOnce({
      loading: true,
      data: [],
      isViewMoreVisable: true
    })
    renderWithProviders(<SubjectList />)

    const viewMoreButton = screen.getByRole('button', {
      name: 'subjectsPage.subjects.viewMore'
    })

    expect(viewMoreButton).toBeDisabled()
  })
})
