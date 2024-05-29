import React from 'react'
import TextField from '@mui/material/TextField'
import AppTextFieldProps from '~/containers/create-request-offer/interfaces/ITextField'

const AppTextField: React.FC<AppTextFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
  multiline = false,
  rows = 1,
  errorMsg,
  helperText,
  name
}) => {
  return (
    <TextField
      error={!!errorMsg}
      fullWidth
      helperText={errorMsg || helperText}
      label={label}
      multiline={multiline}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      rows={rows}
      value={value}
      variant='outlined'
    />
  )
}

export default AppTextField
