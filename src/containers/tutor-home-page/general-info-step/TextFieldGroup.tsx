import React, { useState } from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/common.json'
import { firstName, lastName } from '~/utils/validations/auth'
import translation from '~/constants/translations/en/become-tutor.json'

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
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')

  const handleBlur =
    (
      validationFn: { (value: any): any; (value: any): any; (arg0: any): any },
      setError: {
        (value: React.SetStateAction<string>): void
        (value: React.SetStateAction<string>): void
        (arg0: any): void
      }
    ) =>
    (event: { target: { value: any } }) => {
      const { value } = event.target
      const errorMsg = validationFn(value)
      setError(errorMsg)
    }

  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={firstNameError}
          label={translations.labels.firstName}
          name='firstName'
          required
          variant='outlined'
          onBlur={handleBlur(firstName, setFirstNameError)}
          multiline={undefined}
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={lastNameError}
          label={translations.labels.lastName}
          name='lastName'
          required
          variant='outlined'
          onBlur={handleBlur(lastName, setLastNameError)}
          multiline={undefined}
        />
      </div>
      <SelectGroup />
      <AppTextField
        className={classes.fullWidthInput}
        errorMsg={undefined}
        helperText={`${messageLength}/100`}
        label={translation.generalInfo.textFieldLabel}
        multiline
        onChange={onMessageChange}
        rows={5}
        value={message}
        variant='outlined'
      />
    </>
  )
}

export default TextFieldGroup
