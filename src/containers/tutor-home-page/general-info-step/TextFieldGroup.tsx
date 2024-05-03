import React from 'react'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'

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
  const { t } = useTranslation()

  return (
    <>
      <div>
        <AppTextField
          errorMsg={undefined}
          label={undefined}
          multiline={undefined}
          name='firstName'
          required
          variant='outlined'
        />
        <AppTextField
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
        errorMsg={undefined}
        helperText={`${messageLength}/100`}
        label='Describe in short your professional status'
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
