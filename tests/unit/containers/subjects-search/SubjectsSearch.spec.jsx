import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, expect, vi } from 'vitest'
import SubjectsSearch from '~/containers/subjects-search/SubjectsSearch'
import useBreakpoints from '~/hooks/use-breakpoints'
import { authRoutes } from '~/router/constants/authRoutes'
import { renderWithProviders } from '../../../test-utils'

const mockCategory = { _id: '1', name: 'Category1' }
const mockReturnInputValue = vi.fn()
const mockSet = vi.fn()
const mockDelete = vi.fn()

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: ({ title, description }) => (
    <div data-testid='title'>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
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

vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    TextField: ({ onChange, placeholder, value }) => (
      <input data-testid={placeholder} onChange={onChange} value={value} />
    )
  }
})

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: () => [
      { get: vi.fn() },
      (mockFn) => {
        mockFn({ set: mockSet, delete: mockDelete })
      }
    ]
  }
})

vi.mock('~/hooks/use-breakpoints')

describe('SubjectsSearch container test', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should render correctly', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    renderWithProviders(<SubjectsSearch />)
    const title = screen.getByTestId('title')
    const categoryInput = screen.getByTestId(
      'subjectsPage.subjects.categoryLabel'
    )
    const subjectInput = screen.getByTestId(
      'subjectsPage.subjects.subjectLabel'
    )
    const searchButton = screen.getByText('common.search')
    expect(title).toBeInTheDocument()
    expect(categoryInput).toBeInTheDocument()
    expect(subjectInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  it('should render correctly on mobile', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: true }))
    renderWithProviders(<SubjectsSearch />)
    const title = screen.getByTestId('title')
    const categoryInput = screen.getByTestId(
      'subjectsPage.subjects.categoryLabel'
    )
    const subjectInput = screen.getByTestId(
      'subjectsPage.subjects.subjectLabel'
    )
    const searchButton = screen.queryByText('common.search')
    expect(title).toBeInTheDocument()
    expect(categoryInput).toBeInTheDocument()
    expect(subjectInput).toBeInTheDocument()
    expect(searchButton).not.toBeInTheDocument()
  })

  it('should redirect to "find offers" page', async () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<SubjectsSearch />} path='/' />
          <Route
            element={<p data-testid='test-page'>test123</p>}
            path={authRoutes.categories.path}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('test-page')).not.toBeInTheDocument()
    fireEvent.click(
      screen.getByText('subjectsPage.subjects.backToAllCategories')
    )
    await waitFor(() => {
      expect(screen.getByTestId('test-page')).toBeInTheDocument()
    })
  })

  it('should redirect to "categories" page', async () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<SubjectsSearch />} path='/' />
          <Route
            element={<p data-testid='test-page'>test123</p>}
            path={authRoutes.findOffers.path}
          />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.queryByTestId('test-page')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('subjectsPage.subjects.showAllOffers'))
    await waitFor(() => {
      expect(screen.getByTestId('test-page')).toBeInTheDocument()
    })
  })

  it('should set search params', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    mockReturnInputValue.mockImplementation(() => mockCategory)
    renderWithProviders(<SubjectsSearch />)

    const categoryInput = screen.getByTestId(
      'subjectsPage.subjects.categoryLabel'
    )
    const subjectInput = screen.getByTestId(
      'subjectsPage.subjects.subjectLabel'
    )
    const searchButton = screen.getByText('common.search')
    fireEvent.change(categoryInput, { target: { value: 'test' } })
    fireEvent.change(subjectInput, { target: { value: 'test' } })
    fireEvent.click(searchButton)
    expect(mockSet).toHaveBeenCalledTimes(3)
  })

  it('should clear all search params', () => {
    useBreakpoints.mockImplementation(() => ({ isMobile: false }))
    mockReturnInputValue.mockImplementation(() => null)
    renderWithProviders(<SubjectsSearch />)

    const categoryInput = screen.getByTestId(
      'subjectsPage.subjects.categoryLabel'
    )
    const subjectInput = screen.getByTestId(
      'subjectsPage.subjects.subjectLabel'
    )
    const searchButton = screen.getByText('common.search')
    fireEvent.change(categoryInput, { target: { value: 'test' } })
    fireEvent.change(subjectInput, { target: { value: '' } })
    fireEvent.click(searchButton)
    expect(mockDelete).toHaveBeenCalledTimes(3)
  })
})
