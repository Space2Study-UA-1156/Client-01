import React from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/become-tutor.json'
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
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={undefined}
          label={undefined}
          multiline={undefined}
          name='firstName'
          required
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={undefined}
          label={undefined}
          multiline={undefined}
          name='lastName'
          required
          variant='outlined'
        />
      </div>
      <SelectGroup />
      <AppTextField
        className={classes.fullWidthInput}
        errorMsg={undefined}
        helperText={`${messageLength}/100`}
        label={translations.generalInfo.textFieldLabel}
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
