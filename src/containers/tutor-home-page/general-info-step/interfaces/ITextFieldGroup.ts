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
  professionalSummary: string
  country: string
  city: string
  [key: string]: unknown
}

export interface StepContextType {
  stepData: StepData
  stepLabels: string[]
  handleStepData: (
    stepLabel: string,
    newData: Partial<FormData>,
    newErrors?: Partial<FormData>
  ) => void
  isNextDisabled: boolean
  toggleNextButton: (disabled: boolean) => void
  isOverEighteen: boolean
  handleOverEighteenChange: (value: boolean) => void
  isFormValid: boolean
  setFormValidation: (isValid: boolean) => void
  setGeneralData: (data: StepData) => void
}
