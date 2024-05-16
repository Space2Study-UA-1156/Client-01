import { render, screen } from '@testing-library/react'
import { withLoader } from '~/hocs/withLoader'

const MockComponent = () => <div>Mock Component</div>
const MockComponentWithLoader = withLoader(MockComponent)

describe('withLoader test', () => {
  it('should render the loader initially', () => {
    render(<MockComponentWithLoader isLoading />)

    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('should render the wrapped component when not loading', () => {
    render(<MockComponentWithLoader isLoading={false} />)

    const mockComponent = screen.getByText('Mock Component')
    expect(mockComponent).toBeInTheDocument()
  })
})
