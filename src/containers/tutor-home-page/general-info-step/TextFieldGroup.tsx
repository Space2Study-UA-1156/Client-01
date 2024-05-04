import React from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
interface TextFieldGroupProps {
  messageLength: number
  onMessageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  message: string
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({
  messageLength,
  onMessageChange,
  message
}) => {
  const classes = useTextFieldGroupStyles()
  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          errorMsg={undefined}
          label={undefined}
          multiline={undefined}
          name='firstName'
          required
          variant='outlined'
          className={classes.halfWidthInput}
        />
        <AppTextField
          errorMsg={undefined}
          label={undefined}
          multiline={undefined}
          name='lastName'
          required
          variant='outlined'
          className={classes.halfWidthInput}
        />
      </div>
      <SelectGroup />
      <AppTextField
        errorMsg={undefined}
        helperText={`${messageLength}/100`}
        label='Describe in short your professional status'
        multiline
        onChange={onMessageChange}
        rows={5}
        value={message}
        variant='outlined'
        className={classes.fullWidthInput}
      />
    </>
  )
}

export default TextFieldGroup
