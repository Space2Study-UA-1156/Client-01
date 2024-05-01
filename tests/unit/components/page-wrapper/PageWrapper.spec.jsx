import { forwardRef } from 'react'
import { render } from '@testing-library/react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

describe('PageWrapper', () => {
  it('should render its children', () => {
    const TestComponent = forwardRef((props, ref) => {
      return (
        <PageWrapper ref={ref} {...props}>
          <div>Test Children</div>
        </PageWrapper>
      )
    })

    TestComponent.displayName = 'TestComponent'

    const { getByText } = render(<TestComponent />)

    expect(getByText('Test Children')).toBeInTheDocument()
  })
})
