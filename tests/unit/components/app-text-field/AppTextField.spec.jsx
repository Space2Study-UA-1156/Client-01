import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it } from 'vitest'
import AppTextField from '~/components/app-text-field/AppTextField'

describe('AppTextField test', () => {
  const props = {
    errorMsg: 'error message',
    label: 'label'
  }
  beforeEach(() => {
    render(<AppTextField {...props} />)
  })

  it('should render input with error message', () => {
    const inputElement = screen.getByLabelText(/label/i)
    const errorMessage = screen.getByText(/error message/i)
    expect(inputElement).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })
})
