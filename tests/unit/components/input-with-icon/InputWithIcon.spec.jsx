import { render, screen } from '@testing-library/react'

import InputWithIcon from '~/components/input-with-icon/InputWithIcon'

describe('InputWithIcon', () => {
  it('renders correctly', () => {
    render(<InputWithIcon />)
    const element = screen.getByRole('textbox')

    expect(element).toBeInTheDocument()
  })

  it('renders with the start icon', () => {
    const startIconTestId = 'startIcon'
    const startIcon = <span data-testid={startIconTestId}></span>
    render(<InputWithIcon startIcon={startIcon} />)
    const element = screen.getByTestId(startIconTestId)

    expect(element).toBeInTheDocument()
  })

  it('renders with the clear icon if the input is not empty', () => {
    render(<InputWithIcon value='value' />)
    const element = screen.getByTestId('clearIcon')

    expect(element).toBeInTheDocument()
  })
})
