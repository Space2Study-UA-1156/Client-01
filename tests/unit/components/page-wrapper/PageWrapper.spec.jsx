import { renderWithProviders } from '~tests/test-utils'
import { screen } from '@testing-library/react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

describe('PageWrapper', () => {
  it('should render its children', () => {
    renderWithProviders(
      <PageWrapper>
        <div>Test Children</div>
      </PageWrapper>
    )

    const testChild = screen.getByText('Test Children')

    expect(testChild).toBeInTheDocument()
  })
})
