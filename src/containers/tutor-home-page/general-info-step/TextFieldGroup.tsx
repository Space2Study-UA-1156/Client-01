import React, { useState, useEffect, FocusEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/common.json'
import {
  firstName,
  lastName,
  professionalSummary
} from '~/utils/validations/stepper'
import translation from '~/constants/translations/en/become-tutor.json'
import { useStepContext } from '~/context/step-context'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import { store } from '~/redux/store'
import { GeneralData } from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'
import { StepContextType } from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'

export type RootState = ReturnType<typeof store.getState>

const TextFieldGroup: React.FC = () => {
  const classes = useTextFieldGroupStyles()
  const { t } = useTranslation()
  const {
    setFormValidation,
    handleStepData,
    stepData,
    stepLabels,
    setGeneralData
  } = useStepContext() as StepContextType

  const [generalStepLabel] = stepLabels
  const { userId, userRole } = useSelector((state: RootState) => state.appMain)
  const formData = stepData[generalStepLabel]

  const [summary, setSummary] = useState(formData.data.professionalSummary)
  const [firstNameValue, setFirstNameValue] = useState(formData.data.firstName)
  const [lastNameValue, setLastNameValue] = useState(formData.data.lastName)

  useEffect(() => {
    if (!firstNameValue && !lastNameValue) {
      const fetchUserData = async () => {
        try {
          const { data } = await userService.getUserById(userId, userRole)
          setFirstNameValue(data.firstName)
          setLastNameValue(data.lastName)

          setGeneralData({
            data: {
              ...formData.data,
              firstName: data.firstName as string,
              lastName: data.lastName
            },
            errors: formData.errors
          })
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }

      if (userId && userRole) {
        void fetchUserData()
      }
    }
  }, [
    userId,
    userRole,
    formData.data,
    formData.errors,
    setGeneralData,
    firstNameValue,
    lastNameValue
  ])

  useEffect(() => {
    const hasErrors = Object.values(formData.errors).some(
      (error) => error !== ''
    )
    setFormValidation(!hasErrors)
  }, [formData, setFormValidation])

  const handleBlur = (
    e: FocusEvent<HTMLInputElement>,
    validationFn: (value: string) => string
  ) => {
    const { value, name } = e.target as {
      value: string
      name: keyof GeneralData['data']
    }
    handleStepData(
      generalStepLabel,
      { [name]: value },
      { [name]: validationFn(value) }
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fieldName: keyof GeneralData['data']
  ) => {
    const { value } = e.target
    setValue(value)
    handleStepData(
      generalStepLabel,
      { [fieldName]: value },
      { [fieldName]: '' }
    )
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 100)
    setSummary(value)
    handleStepData(
      generalStepLabel,
      { professionalSummary: value },
      { professionalSummary: '' }
    )
  }

  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={t(formData.errors.firstName)}
          label={translations.labels.firstName}
          multiline={false}
          name='firstName'
          onBlur={(e) => handleBlur(e, firstName)}
          onChange={(e) => handleInputChange(e, setFirstNameValue, 'firstName')}
          required
          value={firstNameValue}
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={t(formData.errors.lastName)}
          label={translations.labels.lastName}
          multiline={false}
          name='lastName'
          onBlur={(e) => handleBlur(e, lastName)}
          onChange={(e) => handleInputChange(e, setLastNameValue, 'lastName')}
          required
          value={lastNameValue}
          variant='outlined'
        />
      </div>
      <SelectGroup />
      <AppTextField
        className={classes.fullWidthInput}
        errorMsg={t(formData.errors.professionalSummary)}
        helperText={`${String(summary).length}/100`}
        label={translation.generalInfo.textFieldLabel}
        multiline
        name='professionalSummary'
        onBlur={(e) => handleBlur(e, professionalSummary)}
        onChange={handleSummaryChange}
        rows={5}
        value={summary}
      />
    </>
  )
}

export default TextFieldGroup