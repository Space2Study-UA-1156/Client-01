import React from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import Box from '@mui/material/Box'

interface TextFieldGroupProps {
  message: string
  messageLength: number
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({
  message,
  messageLength,
  onMessageChange
}) => {
  const classes = useTextFieldGroupStyles()

  return (
    <Box className={classes.inputRow}>
      <AppTextField
        className={classes.halfWidthInput}
        errorMsg={undefined}
        label='First Name'
        multiline={undefined}
        name='firstName'
        required
        value=''
        variant='outlined'
      />
      <AppTextField
        className={classes.halfWidthInput}
        errorMsg={undefined}
        label='Last Name'
        multiline={undefined}
        name='lastName'
        required
        value=''
        variant='outlined'
      />

      <SelectGroup />
      <AppTextField
        className={classes.fullWidthInput}
        errorMsg={undefined}
        helperText={`${messageLength}/100`}
        label={translations.generalInfo.textFieldLabel}
        multiline={undefined}
        onChange={onMessageChange}
        rows={5}
        value={message}
        variant='outlined'
      />
    </Box>
  )
}

export default TextFieldGroup
