import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import FormSection from '~/containers/tutor-home-page/general-info-step/FormSection'
import { studentStepLabels } from '~/components/user-steps-wrapper/constants'

const handleStepDataMock = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn(() => ({
    handleStepData: handleStepDataMock,
    stepLabels: studentStepLabels,
    stepData: {
      [studentStepLabels[0]]: {
        data: {
          message: ''
        },
        errors: {}
      }
    },
    isNextDisabled: true,
    toggleNextButton: vi.fn(),
    isOverEighteen: false,
    handleOverEighteenChange: vi.fn(),
    setFormValidation: vi.fn(),
    isFormValid: false
  }))
}))

vi.mock(
  '~/containers/tutor-home-page/general-info-step/TextFieldGroup',
  () => ({
    __esModule: true,
    default: () => <div />
  })
)

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

describe('FormSection Component', () => {
  const mockBtnsBox = <div>Mock Buttons</div>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    renderWithTheme(<FormSection btnsBox={mockBtnsBox} />)
    const formSection = screen.getByTestId('form-section')
    expect(formSection).toBeInTheDocument()
  })

  it('checkbox is unchecked by default', () => {
    renderWithTheme(<FormSection btnsBox={mockBtnsBox} />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.checked).toBe(false)
  })

  it('updates checkbox state when clicked', () => {
    renderWithTheme(<FormSection btnsBox={mockBtnsBox} />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })
})
