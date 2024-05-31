import React from 'react'
import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TextFieldGroup from '~/containers/tutor-home-page/general-info-step/TextFieldGroup'
import { studentStepLabels } from '~/components/user-steps-wrapper/constants'
import { renderWithProviders } from '../../../../test-utils'

const handleStepDataMock = vi.fn()
const setFormValidationMock = vi.fn()

vi.spyOn(console, 'error').mockImplementation(() => undefined)
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn(() => ({
    handleStepData: handleStepDataMock,
    setFormValidation: setFormValidationMock,
    stepLabels: studentStepLabels,
    stepData: {
      [studentStepLabels[0]]: {
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

describe('TextFieldGroup component', () => {
  it('should render', () => {
    renderWithProviders(<TextFieldGroup />, {
      preloadedState: {
        appMain: {
          userId: 'testUserId',
          userRole: 'testUserRole'
        }
      }
    })
    expect(screen.getByLabelText('First name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last name')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Describe in short your professional status')
    ).toBeInTheDocument()
    expect(screen.getByTestId('select-group')).toBeInTheDocument()
  })
})
