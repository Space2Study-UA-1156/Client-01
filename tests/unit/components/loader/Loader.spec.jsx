import { render, screen } from '@testing-library/react'

import Loader from '~/components/loader/Loader'

describe('Loader', () => {
  it('renders correctly', () => {
    render(<Loader />)
    const element = screen.getByTestId('loader')

    expect(element).toBeInTheDocument()
  })
})
