import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import FormSection from '~/containers/tutor-home-page/general-info-step/FormSection'

const handleStepDataMock = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn(() => ({
    handleStepData: handleStepDataMock,
    stepData: {
      general: {
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
