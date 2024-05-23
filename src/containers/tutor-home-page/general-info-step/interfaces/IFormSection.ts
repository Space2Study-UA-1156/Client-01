import { ReactElement } from 'react'

export interface FormSectionProps {
  btnsBox: ReactElement
}
export interface StepContext {
  toggleNextButton: (value: boolean) => void
  isOverEighteen: boolean
  handleOverEighteenChange: (value: boolean) => void
}

export interface GeneralData {
  data: Record<string, string>
  errors: Record<string, string>
}

export interface StepData {
  general: GeneralData
  [key: string]: GeneralData
}

export interface StepContextType {
  stepData: StepData
  handleStepData: (
    stepLabel: string,
    newData: unknown,
    newErrors?: Record<string, unknown>
  ) => void
  isNextDisabled: boolean
  toggleNextButton: (disabled: boolean) => void
  isOverEighteen: boolean
  handleOverEighteenChange: (value: boolean) => void
  isFormValid: boolean
}
