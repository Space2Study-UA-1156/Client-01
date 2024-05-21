import { fireEvent, screen, render } from '@testing-library/react'
import ExploreOffers from '~/containers/explore-offers/ExploreOffers'
import { renderWithProviders } from '~tests/test-utils'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { vi } from 'vitest'
import useBreakpoints from '~/hooks/use-breakpoints'

const mockTutor = { name: 'Tutor' }
const mockCategory = { _id: '1', name: 'Category' }
const mockSubject = { _id: '2', name: 'Subject' }

const mockReturnInputValue = vi.fn()
const mockSet = vi.fn()
const mockDelete = vi.fn()
const mockNavigate = vi.fn()

vi.mock('~/hooks/use-breakpoints')

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [
      { get: vi.fn() },
      (mockFn) => {
        mockFn({ set: mockSet, delete: mockDelete })
      }
    ]
  }
})

vi.mock('~/components/app-text-field/AppTextField', () => ({
  __esModule: true,
  default: ({ InputProps, value, onChange, onKeyDown }) => {
    return (
      <div>
        {InputProps.startAdornment}
        <input
          data-testid='mocked-app-textfield'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
        {InputProps.endAdornment}
      </div>
    )
  }
}))

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    TextField: ({ onChange, placeholder, value }) => (
      <input data-testid={placeholder} onChange={onChange} value={value} />
    )
  }
})

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: () => <div data-testid='title-description'></div>
}))

vi.mock('~/components/async-autocomlete/AsyncAutocomplete', () => ({
  __esModule: true,
  default: ({ onChange, textFieldProps }) => (
    <input
      data-testid={textFieldProps.placeholder}
      onChange={() => onChange(null, mockReturnInputValue())}
    />
  )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ data_testid, onClick }) => (
    <button data-testid={data_testid} onClick={onClick}></button>
  )
}))

describe('ExploreOffers container', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should set and delete category_id search params', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    mockReturnInputValue.mockImplementationOnce(() => mockCategory)
    renderWithProviders(<ExploreOffers />)

    const categoryInput = screen.getByTestId(
      'offerPage.createOffer.labels.category'
    )

    fireEvent.change(categoryInput, { target: { value: mockCategory.name } })
    fireEvent.change(categoryInput, { target: { value: mockCategory._id } })

    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('categoryId', mockCategory._id)
    })

    fireEvent.change(categoryInput, { target: { value: '' } })

    assert(() => {
      expect(mockDelete).toHaveBeenCalledWith('categoryId')
    })
  })

  it('should set and delete subject_id search params', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    mockReturnInputValue.mockImplementationOnce(() => mockSubject)
    renderWithProviders(<ExploreOffers />)

    const subjectInput = screen.getByTestId(
      'offerPage.createOffer.labels.subject'
    )

    fireEvent.change(subjectInput, { target: { value: mockSubject.name } })
    fireEvent.change(subjectInput, { target: { value: mockSubject._id } })

    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('subjectId', mockSubject._id)
    })

    fireEvent.change(subjectInput, { target: { value: '' } })

    assert(() => {
      expect(mockDelete).toHaveBeenCalledWith('subjectId')
    })
  })

  it('should set tutor search params correctly', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<ExploreOffers />)

    const tutorInput = screen.getByTestId('mocked-app-textfield')
    const searchButton = screen.queryByTestId('button-search')

    // Test case 1: One word (tutorLastName only)
    fireEvent.change(tutorInput, { target: { value: 'Smith' } })
    fireEvent.click(searchButton)

    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('tutorFirstName', '')
      expect(mockSet).toHaveBeenCalledWith('tutorLastName', 'Smith')
    })

    mockSet.mockClear()

    // Test case 2: Two words (tutorFirstName and tutorLastName)
    fireEvent.change(tutorInput, { target: { value: 'John Smith' } })
    fireEvent.click(searchButton)
    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('tutorFirstName', 'John')
      expect(mockSet).toHaveBeenCalledWith('tutorLastName', 'Smith')
    })

    mockSet.mockClear()

    // Test case 3: More than two words (tutorFirstName and tutorLastName)
    fireEvent.change(tutorInput, { target: { value: 'John Michael Smith' } })
    fireEvent.click(searchButton)
    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('tutorFirstName', 'John')
      expect(mockSet).toHaveBeenCalledWith('tutorLastName', 'Smith')
    })
  })

  it('should clear tutor firstName and lastName search params', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    mockReturnInputValue.mockImplementation(() => mockTutor)
    renderWithProviders(<ExploreOffers />)

    const tutorInput = screen.getByTestId('mocked-app-textfield')
    fireEvent.change(tutorInput, { target: { value: '' } })

    const searchButton = screen.queryByTestId('button-search')
    fireEvent.click(searchButton)

    assert(() => {
      expect(mockDelete).toHaveBeenCalledWith('tutorFirstName')
      expect(mockDelete).toHaveBeenCalledWith('tutorLastName')
    })
  })

  it('should set tutor search params correctly on Enter key press', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<ExploreOffers />)

    const tutorInput = screen.getByTestId('mocked-app-textfield')

    // Test case 1: One word (tutorLastName only) - Enter Key Press
    fireEvent.change(tutorInput, { target: { value: 'Smith' } })
    fireEvent.keyDown(tutorInput, { key: 'Enter', code: 'Enter' })

    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('tutorFirstName', '')
      expect(mockSet).toHaveBeenCalledWith('tutorLastName', 'Smith')
    })

    mockSet.mockClear()

    // Test case 2: Two words (tutorFirstName and tutorLastName) - Enter Key Press
    fireEvent.change(tutorInput, { target: { value: 'John Smith' } })
    fireEvent.keyDown(tutorInput, { key: 'Enter', code: 'Enter' })

    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('tutorFirstName', 'John')
      expect(mockSet).toHaveBeenCalledWith('tutorLastName', 'Smith')
    })

    mockSet.mockClear()

    // Test case 3: More than two words (tutorFirstName and tutorLastName) - Enter Key Press
    fireEvent.change(tutorInput, { target: { value: 'John Michael Smith' } })
    fireEvent.keyDown(tutorInput, { key: 'Enter', code: 'Enter' })

    assert(() => {
      expect(mockSet).toHaveBeenCalledWith('tutorFirstName', 'John')
      expect(mockSet).toHaveBeenCalledWith('tutorLastName', 'Smith')
    })
  })

  it('should clear tutor field when CloseIcon is clicked', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<ExploreOffers />)

    const tutorInput = screen.getByTestId('mocked-app-textfield')
    const closeIcon = screen.getByTestId('close-icon')

    fireEvent.change(tutorInput, { target: { value: 'John Smith' } })
    expect(tutorInput.value).toBe('John Smith')

    fireEvent.click(closeIcon)

    expect(tutorInput.value).toBe('')
  })

  it('should render correctly', () => {
    useBreakpoints.mockImplementation(() => ({
      isMobile: false,
      isTablet: false
    }))
    renderWithProviders(<ExploreOffers />)

    const title = screen.getByTestId('title-description')
    const categoryInput = screen.queryByTestId('mocked-app-textfield')
    const returnButton = screen.queryByTestId('button-return')
    const showAllButton = screen.queryByTestId('button-show-all')
    const searchButton = screen.queryByTestId('button-search')

    expect(title).toBeInTheDocument()
    expect(categoryInput).toBeInTheDocument()
    expect(returnButton).toBeInTheDocument()
    expect(showAllButton).not.toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  it('should render correctly on mobile', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: true }))
    renderWithProviders(<ExploreOffers />)

    const title = screen.getByTestId('title-description')
    const categoryInput = screen.queryByTestId('mocked-app-textfield')
    const returnButton = screen.getByTestId('button-return')
    const showAllButton = screen.getByTestId('button-show-all')
    const searchButton = screen.queryByTestId('button-search')

    expect(title).toBeInTheDocument()
    expect(categoryInput).not.toBeInTheDocument()
    expect(returnButton).toBeInTheDocument()
    expect(showAllButton).toBeInTheDocument()
    expect(searchButton).not.toBeInTheDocument()
  })

  it('should redirect to "categories" page when "Back to all categories" button is clicked', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<ExploreOffers />} path='/' />
          <Route
            element={<p data-testid='test-page'>Test Page</p>}
            path='/categories'
          />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('button-return'))

    expect(mockNavigate).toHaveBeenCalledWith(authRoutes.categories.path)
  })

  it('should redirect to "find-offers" page when "Show all offers" button is clicked', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: true }))
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<ExploreOffers />} path='/' />
          <Route
            element={<p data-testid='test-page'>Test Page</p>}
            path='/findOffers'
          />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('button-show-all'))

    expect(mockNavigate).toHaveBeenCalledWith(authRoutes.findOffers.path)
  })
})
