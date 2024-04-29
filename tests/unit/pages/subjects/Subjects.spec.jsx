import { renderWithProviders } from '~tests/test-utils'
import Subjects from '~/pages/subjects/Subjects'
import { screen } from '@testing-library/react'

describe('SubjectPage test', () => {
  it('It should render page', () => {
    renderWithProviders(<Subjects />)
    const pageTitle = screen.getByText('Subjects')
    expect(pageTitle).toBeInTheDocument()
  })
  it('Text of the page must be in the document', () => {
    renderWithProviders(<Subjects />)
    const text = screen.getByText('Subjects')
    expect(text).toBeInTheDocument()
  })
})
