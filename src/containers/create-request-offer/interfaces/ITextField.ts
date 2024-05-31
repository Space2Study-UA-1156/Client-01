import { ChangeEvent, FocusEvent } from 'react'

interface AppTextFieldProps {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
  multiline?: boolean
  rows?: number
  errorMsg?: string
  helperText?: string
  name: string
  fullWidth?: boolean
  margin?: 'none' | 'dense' | 'normal'
  sx?: any
}

export default AppTextFieldProps
