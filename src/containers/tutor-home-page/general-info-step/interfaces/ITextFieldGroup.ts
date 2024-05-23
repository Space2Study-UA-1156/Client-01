import { ChangeEvent } from 'react'
import { StepData } from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'

export interface User {
  firstName: string
  lastName: string
}

export interface TextFieldGroupProps {
  message: string
  messageLength: number
  onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface FormData {
  firstName: string
  lastName: string
  message: string
  [key: string]: unknown
}

export interface StepContextType {
  stepData: StepData
  handleStepData: (
    stepLabel: string,
    newData: Record<string, unknown>,
    newErrors: Record<string, unknown>
  ) => void
  isNextDisabled: boolean
  toggleNextButton: (disabled: boolean) => void
  isOverEighteen: boolean
  handleOverEighteenChange: (value: boolean) => void
  isFormValid: boolean
  setFormValidation: (isValid: boolean) => void
  generalData: {
    data: FormData
    errors: FormData
  }
  setGeneralData: (data: { data: FormData; errors: FormData }) => void
}
