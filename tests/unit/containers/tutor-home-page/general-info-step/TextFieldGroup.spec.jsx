import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import TextFieldGroup from '~/containers/tutor-home-page/general-info-step/TextFieldGroup'
import translations from '~/constants/translations/en/common.json'

const handleStepDataMock = vi.fn()
const setFormValidationMock = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn(() => ({
    handleStepData: handleStepDataMock,
    setFormValidation: setFormValidationMock,
    stepData: {
      'General Info': {
        data: {
          firstName: '',
          lastName: '',
          message: ''
        },
        errors: {
          firstName: '',
          lastName: '',
          message: ''
        }
      }
    }
  }))
}))

vi.mock('./SelectGroup', () => ({
  __esModule: true,
  default: () => <div data-testid='select-group' />
}))

vi.mock('~/components/app-text-field/AppTextField', () => ({
  __esModule: true,
  default: ({ label, ...props }) => (
    <div>
      <label>{label}</label>
      <input aria-label={label} {...props} />
    </div>
  )
}))

const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
})

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('TextFieldGroup Component', () => {
  const mockOnMessageChange = vi.fn()
  const props = {
    message: '',
    messageLength: 0,
    onMessageChange: mockOnMessageChange
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('updates first name value when input changes', () => {
    renderWithTheme(<TextFieldGroup {...props} />)
    const firstNameInput = screen.getByLabelText(translations.labels.firstName)
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    expect(firstNameInput.value).toBe('John')
  })

  it('updates last name value when input changes', () => {
    renderWithTheme(<TextFieldGroup {...props} />)
    const lastNameInput = screen.getByLabelText(translations.labels.lastName)
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    expect(lastNameInput.value).toBe('Doe')
  })

  it('validates first name on blur', () => {
    renderWithTheme(<TextFieldGroup {...props} />)
    const firstNameInput = screen.getByLabelText(translations.labels.firstName)
    fireEvent.blur(firstNameInput)
    expect(handleStepDataMock).toHaveBeenCalled()
  })

  it('validates last name on blur', () => {
    renderWithTheme(<TextFieldGroup {...props} />)
    const lastNameInput = screen.getByLabelText(translations.labels.lastName)
    fireEvent.blur(lastNameInput)
    expect(handleStepDataMock).toHaveBeenCalled()
  })
})
