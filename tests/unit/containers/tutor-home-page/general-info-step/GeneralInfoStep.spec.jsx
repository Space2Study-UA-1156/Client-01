import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'

vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles',
  () => ({
    useGeneralInfoStepStyles: () => ({
      root: 'root',
      contentContainer: 'contentContainer',
      btnContainer: 'btnContainer'
    })
  })
)

vi.mock('~/containers/tutor-home-page/general-info-step/ImageSection', () => ({
  __esModule: true,
  default: () => <div data-testid='image-section' />
}))

vi.mock('~/containers/tutor-home-page/general-info-step/FormSection', () => ({
  __esModule: true,
  default: ({ btnsBox }) => <div data-testid='form-section'>{btnsBox}</div>
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

describe('GeneralInfoStep Component', () => {
  const mockBtnsBox = <div>Mock Buttons</div>

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    renderWithTheme(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    expect(screen.getByTestId('content-container')).toBeInTheDocument()
  })

  it('displays ImageSection component', () => {
    renderWithTheme(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    expect(screen.getByTestId('image-section')).toBeInTheDocument()
  })

  it('displays FormSection component', () => {
    renderWithTheme(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    expect(screen.getByTestId('form-section')).toBeInTheDocument()
  })

  it('displays passed buttons in FormSection', () => {
    renderWithTheme(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    expect(screen.getByTestId('btn-container')).toBeInTheDocument()
    expect(screen.getByText('Mock Buttons')).toBeInTheDocument()
  })
})
