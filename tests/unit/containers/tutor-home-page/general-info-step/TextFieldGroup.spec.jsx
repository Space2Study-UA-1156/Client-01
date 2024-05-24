import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TextFieldGroup from '~/containers/tutor-home-page/general-info-step/TextFieldGroup'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import configureMockStore from 'redux-mock-store'
import { studentStepLabels } from '~/components/user-steps-wrapper/constants'
import { Provider } from 'react-redux'

const props = {
  onMessageChange: vi.fn()
}

const handleStepDataMock = vi.fn()
const setFormValidationMock = vi.fn()

vi.spyOn(console, 'error').mockImplementation(() => undefined)
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn(() => ({
    handleStepData: handleStepDataMock,
    setFormValidation: setFormValidationMock,
    stepLabels: studentStepLabels,
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
    },
    generalData: {
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
    },
    isOverEighteen: false,
    handleOverEighteenChange: vi.fn(),
    isNextDisabled: false,
    toggleNextButton: vi.fn(),
    isFormValid: true
  }))
}))

const mockStore = configureMockStore()
const store = mockStore({
  appMain: {
    userId: 'testUserId',
    userRole: 'testUserRole'
  }
})

vi.mock('~/containers/tutor-home-page/general-info-step/SelectGroup', () => ({
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
  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </Provider>
  )
}

describe('TextFieldGroup component', () => {
  it('should render', () => {
    renderWithTheme(<TextFieldGroup {...props} />)
    expect(screen.getByLabelText('First name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last name')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Describe in short your professional status')
    ).toBeInTheDocument()
    expect(screen.getByTestId('select-group')).toBeInTheDocument()
  })
})
