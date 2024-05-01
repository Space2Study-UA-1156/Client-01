import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import Subjects from '~/pages/subjects/Subjects'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: vi.fn(({ children }) => (
    <div data-testid='page-title'>{children}</div>
  ))
}))

describe('SubjectPage test', () => {
  it('It should render page', () => {
    renderWithProviders(<Subjects />)
    const pageTitle = screen.getByTestId('page-title')
    expect(pageTitle).toBeInTheDocument()
  })
  it('Text of the page must be in the document', () => {
    renderWithProviders(<Subjects />)
    const text = screen.getByText('Subjects')
    expect(text).toBeInTheDocument()
  })
})
