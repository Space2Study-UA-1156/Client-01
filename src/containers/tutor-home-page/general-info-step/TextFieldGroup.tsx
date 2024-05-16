import React, { useState, useEffect, FocusEvent, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/common.json'
import { firstName, lastName } from '~/utils/validations/auth'
import translation from '~/constants/translations/en/become-tutor.json'
import { useStepContext } from '~/context/step-context'
import { StepContextType } from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'

interface TextFieldGroupProps {
  message: string
  messageLength: number
  onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void
}

interface FormData {
  firstName: string
  lastName: string
  message: string
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({
  message,
  messageLength,
  onMessageChange
}) => {
  const classes = useTextFieldGroupStyles()
  const { t } = useTranslation()
  const { setFormValidation, handleStepData, stepData } =
    useStepContext() as StepContextType

  const initialValidationErrors = (stepData['General Info']
    ?.errors as FormData) || {
    firstName: '',
    lastName: '',
    message: ''
  }

  const initialFormData = (stepData['General Info']?.data as FormData) || {
    firstName: '',
    lastName: '',
    message: ''
  }

  const [validationErrors, setValidationErrors] = useState<FormData>(
    initialValidationErrors
  )
  const [formData, setFormData] = useState<FormData>(initialFormData)

  useEffect(() => {
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ''
    )
    setFormValidation(!hasErrors) // eslint-disable-line
  }, [validationErrors, setFormValidation])

  useEffect(() => {
    handleStepData('General Info', formData, validationErrors)
  }, [formData, validationErrors, handleStepData])

  const handleBlur = (
    e: FocusEvent<HTMLInputElement>,
    validationFn?: (value: string) => string
  ) => {
    const { value, name } = e.target as { value: string; name: keyof FormData }
    let errorMsg = ''
    if (validationFn) {
      errorMsg = validationFn(value)
    }
    if (!value) {
      errorMsg = t('This field cannot be empty')
    }
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: t(errorMsg)
    }))
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={validationErrors.firstName}
          label={translations.labels.firstName}
          multiline={false}
          name='firstName'
          onBlur={(e: FocusEvent<HTMLInputElement, Element>) =>
            handleBlur(e, firstName)
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            setFormData((prevData) => ({
              ...prevData,
              firstName: value
            }))
          }}
          required
          value={formData.firstName}
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={validationErrors.lastName}
          label={translations.labels.lastName}
          multiline={false}
          name='lastName'
          onBlur={(e: FocusEvent<HTMLInputElement, Element>) =>
            handleBlur(e, lastName)
          }
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            setFormData((prevData) => ({
              ...prevData,
              lastName: value
            }))
          }}
          required
          value={formData.lastName}
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
        onBlur={handleBlur}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target
          setFormData((prevData) => ({
            ...prevData,
            message: value
          }))
          onMessageChange(e)
        }}
        rows={5}
        value={message}
      />
    </>
  )
}

export default TextFieldGroup
