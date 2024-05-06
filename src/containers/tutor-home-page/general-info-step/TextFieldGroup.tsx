import React, { useEffect, useState } from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import { userService } from '~/services/user-service'

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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    userService
      .getUsers()
      .then((response) => {
        const users = response.data
        if (users.length > 0) {
          const latestUser = users[users.length - 1]
          setFirstName(latestUser.firstName)
          setLastName(latestUser.lastName)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          label='First Name'
          name='firstName'
          required
          variant='outlined'
          errorMsg={undefined}
          multiline={undefined}
        />
        <AppTextField
          className={classes.halfWidthInput}
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          label='Last Name'
          name='lastName'
          required
          variant='outlined'
          errorMsg={undefined}
          multiline={undefined}
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
      {loading && <p>Loading user information...</p>}
    </>
  )
}

export default TextFieldGroup
