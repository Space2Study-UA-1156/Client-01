import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import AppTextField from '~/components/app-text-field/AppTextField'

vi.mock('@mui/material/Tooltip', () => {
  return {
    __esModule: true,
    default: ({ title, children }) => <span title={title}>{children}</span>
  }
})
vi.mock('@mui/material/Typography', () => {
  return {
    __esModule: true,
    default: ({ variant, children }) => (
      <span data-testid={variant}>{children}</span>
    )
  }
})

describe('AppTextField test', () => {
  it('should render input with error message', () => {
    render(<AppTextField errorMsg='error message' label='label' />)
    const inputElement = screen.getByLabelText(/label/i)
    const errorMessage = screen.getByTitle(/error message/i)
    expect(inputElement).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })
  it('should render input without error message', () => {
    render(<AppTextField errorMsg={''} label='label' />)
    const inputElement = screen.getByLabelText(/label/i)
    const errorMessage = screen.queryByTitle('')
    expect(inputElement).toBeInTheDocument()
    expect(errorMessage).toBeNull()
  })
})
