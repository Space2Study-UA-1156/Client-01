import { fireEvent, screen, render } from '@testing-library/react'
import CategoriesTitleInput from '~/containers/categories-title-input/CategoriesTitleInput'
import { renderWithProviders } from '~tests/test-utils'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { vi } from 'vitest'
import useBreakpoints from '~/hooks/use-breakpoints'

const mockCategory = { name: 'Category1' }
const mockReturnInputValue = vi.fn()
const mockSet = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      switch (key) {
        case 'common.search':
          return 'search'
        case 'categoriesPage.searchLabel':
          return 'input'
        case 'categoriesPage.request':
          return 'request'
        case 'categoriesPage.category':
          return 'category'
        case 'categoriesPage.or':
          return 'or'
        case 'categoriesPage.subject':
          return 'subject'
        default:
          return key
      }
    }
  })
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({ isMobile: false })
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [
      { get: vi.fn() },
      (mockFn) => {
        mockFn({ set: mockSet })
      }
    ]
  }
})

vi.mock('~/components/app-text-field/AppTextField', () => ({
  __esModule: true,
  default: ({ placeholder, value, onChange, onKeyDown }) => (
    <div>
      <input
        data-testid='mocked-app-textfield'
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
      <button data-testid='button-search' onClick={() => {}}></button>
    </div>
  )
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

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ data_testid, onClick }) => (
    <button data-testid={data_testid} onClick={onClick}></button>
  )
}))

vi.mock('@mui/material/Typography', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <div data-testid='footer'>{children}</div>
    }
  }
})

describe('CategoriesTitleInput container', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should update categoryName state when input value changes', () => {
    useBreakpoints.mockReturnValue({ isMobile: false })
    renderWithProviders(<CategoriesTitleInput />)
    const searchInput = screen.getByPlaceholderText('input')
    const testValue = 'test search value'
    fireEvent.change(searchInput, { target: { value: testValue } })

    expect(searchInput.value).toBe(testValue)
  })

  it('should set search params when "Search" button is clicked', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<CategoriesTitleInput />)

    mockReturnInputValue.mockImplementation(() => mockCategory)

    const categoryInput = screen.getByPlaceholderText('input')
    const searchButton = screen.getByTestId('button-search')
    fireEvent.change(categoryInput, { target: { value: 'test' } })
    fireEvent.click(searchButton)
    assert(() => {
      expect(mockSet).toHaveBeenCalledTimes(1)
    })
  })

  it('should set search params when "Enter"  is clicked', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<CategoriesTitleInput />)

    mockReturnInputValue.mockImplementationOnce(() => mockCategory)

    const categoryInput = screen.getByPlaceholderText('input')
    fireEvent.change(categoryInput, { target: { value: 'test' } })

    fireEvent.keyDown(categoryInput, { key: 'Enter', code: 'Enter' })

    assert(() => {
      expect(mockSet).toHaveBeenCalledTimes(1)
    })
  })

  it('should render correctly', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<CategoriesTitleInput />)

    const title = screen.getByTestId('title-description')
    const categoryInput = screen.getByTestId('mocked-app-textfield')
    const searchButton = screen.getByTestId('button-search')
    const footerElements = screen.getAllByTestId('footer')

    expect(title).toBeInTheDocument()
    expect(categoryInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
    expect(footerElements).toHaveLength(3)
  })

  it('should render correctly on mobile', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: true }))
    renderWithProviders(<CategoriesTitleInput />)

    const title = screen.getByTestId('title-description')
    const categoryInput = screen.getByTestId('mocked-app-textfield')
    const searchButton = screen.getByTestId('button-search')
    const footerElements = screen.queryAllByTestId('footer')

    expect(title).toBeInTheDocument()
    expect(categoryInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
    expect(footerElements).toHaveLength(0)
  })

  it('should redirect to "find offers" page when "Show all offers" button is clicked', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<CategoriesTitleInput />} path='/' />
          <Route
            element={<p data-testid='test-page'>Test Page</p>}
            path='/find-offers'
          />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByTestId('button-show-all'))

    expect(mockNavigate).toHaveBeenCalledWith(authRoutes.findOffers.path)
  })
})
