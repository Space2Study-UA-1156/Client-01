import React, { useEffect, useState } from 'react'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/become-tutor.json'
import { userService } from '~/services/user-service'
import {
  TextFieldGroupProps,
  User
} from '~/containers/tutor-home-page/general-info-step/interfaces/ITextFieldGroup'

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
      .then((response: { data: User[] }) => {
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
          errorMsg={undefined}
          label='First Name'
          multiline={undefined}
          name='firstName'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          required
          value={firstName}
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={undefined}
          label='Last Name'
          multiline={undefined}
          name='lastName'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          required
          value={lastName}
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
      {loading && <p>Loading user information...</p>}
    </>
  )
}

export default TextFieldGroup
