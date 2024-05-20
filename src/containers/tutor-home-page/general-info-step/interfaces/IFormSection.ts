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
  data: Record<string, unknown>
  errors: Record<string, unknown>
}

export interface StepData {
  general: GeneralData
  [key: string]: GeneralData | null
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
