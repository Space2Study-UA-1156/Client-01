import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/common.json'
import { firstName, lastName } from '~/utils/validations/auth'
import translation from '~/constants/translations/en/become-tutor.json'
import { useStepContext } from '~/context/step-context'

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
  const { t } = useTranslation()
  const { setFormValidation, handleStepData, stepData } = useStepContext()

  const [validationErrors, setValidationErrors] = useState(
    stepData.generalData?.errors || {
      firstName: '',
      lastName: '',
      message: ''
    }
  )

  useEffect(() => {
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ''
    )
    setFormValidation(!hasErrors)
  }, [validationErrors, setFormValidation])

  useEffect(() => {
    handleStepData('General Info', {}, validationErrors)
  }, [validationErrors, handleStepData])

  type FocusEvent = React.FocusEvent<HTMLInputElement>

  const handleBlur = (
    e: FocusEvent,
    validationFn?: (value: string) => string
  ) => {
    const { value, name } = e.target
    let errorMsg = ''
    if (validationFn) {
      errorMsg = validationFn(value)
    }
    if (!value) {
      errorMsg = t('This field cannot be empty')
    }
    setValidationErrors((prevErrors: any) => ({
      ...prevErrors,
      [name]: t(errorMsg)
    }))
  }

  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={validationErrors.firstName}
          label={translations.labels.firstName}
          multiline={undefined}
          name='firstName'
          onBlur={(e: FocusEvent) => handleBlur(e, firstName)}
          required
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={validationErrors.lastName}
          label={translations.labels.lastName}
          multiline={undefined}
          name='lastName'
          onBlur={(e: FocusEvent) => handleBlur(e, lastName)}
          required
          variant='outlined'
        />
      </div>
      <SelectGroup />
      <AppTextField
        className={classes.fullWidthInput}
        errorMsg={validationErrors.message}
        helperText={`${messageLength}/100`}
        label={translation.generalInfo.textFieldLabel}
        multiline
        name='message'
        onBlur={(e: FocusEvent) => handleBlur(e)}
        onChange={onMessageChange}
        rows={5}
        value={message}
        variant='outlined'
      />
    </>
  )
}

export default TextFieldGroup
