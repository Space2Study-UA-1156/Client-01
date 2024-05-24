import React, { useState, useEffect, FocusEvent, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import AppTextField from '~/components/app-text-field/AppTextField'
import SelectGroup from './SelectGroup'
import { useTextFieldGroupStyles } from './TextFieldGroup.styles'
import translations from '~/constants/translations/en/common.json'
import { firstName, lastName } from '~/utils/validations/auth'
import translation from '~/constants/translations/en/become-tutor.json'
import { useStepContext } from '~/context/step-context'
import {
  TextFieldGroupProps,
  FormData,
  StepContextType
} from '~/containers/tutor-home-page/general-info-step/interfaces/ITextFieldGroup'
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'

interface RootState {
  appMain: AppMainState
}
interface AppMainState {
  userId: string
  userRole: string
  authLoading: boolean
  loading: boolean
  pageLoad: boolean
  error: string
  isFirstLogin: boolean
}

const TextFieldGroup: React.FC<TextFieldGroupProps> = ({
  messageLength,
  onMessageChange
}) => {
  const classes = useTextFieldGroupStyles()
  const { t } = useTranslation()
  const {
    setFormValidation,
    handleStepData,
    stepData,
    generalData,
    setGeneralData
  } = useStepContext() as StepContextType

  const { userId, userRole } = useSelector((state: RootState) => state.appMain)

  const initialValidationErrors: FormData = (stepData['General Info']
    ?.errors as unknown as FormData) || {
    firstName: '',
    lastName: '',
    message: ''
  }

  const initialFormData: FormData = generalData.data || {
    firstName: '',
    lastName: '',
    message: ''
  }

  const [validationErrors, setValidationErrors] = useState<FormData>(
    initialValidationErrors
  )
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const fetchUserData = async () => {
      try {
        const { data } = await userService.getUserById(userId, userRole)
        if (isMounted) {
          setFormData((prevData) => ({
            ...prevData,
            firstName: data.firstName,
            lastName: data.lastName,
            message: prevData.message || ''
          }))
          setGeneralData({
            data: {
              ...generalData.data,
              firstName: data.firstName,
              lastName: data.lastName,
              message: generalData.data.message || ''
            },
            errors: generalData.errors
          })
          setIsDataFetched(true)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    if (userId && !isDataFetched) {
      fetchUserData().catch((error) =>
        console.error('Error in useEffect:', error)
      )
    }

    return () => {
      isMounted = false
    }
  }, [
    userId,
    userRole,
    setGeneralData,
    isDataFetched,
    generalData.data,
    generalData.errors
  ])

  useEffect(() => {
    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ''
    )
    setFormValidation(!hasErrors)
  }, [validationErrors, setFormValidation])

  useEffect(() => {
    handleStepData('General Info', formData, validationErrors)
  }, [formData, validationErrors, handleStepData])

  useEffect(() => {
    setFormData(generalData.data)
  }, [generalData.data])

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
    setGeneralData({
      ...generalData,
      data: {
        ...generalData.data,
        [name]: value
      },
      errors: {
        ...generalData.errors,
        [name]: t(errorMsg)
      }
    })
  }

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target
    if (value.length > 100) {
      value = value.substring(0, 100)
    }
    setFormData((prevData) => ({
      ...prevData,
      message: value
    }))
    handleStepData('General Info', { message: value }, validationErrors)
    onMessageChange(e)
    setGeneralData({
      ...generalData,
      data: {
        ...generalData.data,
        message: value
      },
      errors: generalData.errors
    })
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
          onBlur={(e) => handleBlur(e, firstName)}
          onChange={(e) => {
            const { value } = e.target
            setFormData((prevData) => ({
              ...prevData,
              firstName: value
            }))
            setGeneralData({
              ...generalData,
              data: {
                ...generalData.data,
                firstName: value
              },
              errors: generalData.errors
            })
          }}
          placeholder={t('First Name')}
          required
          value={formData.firstName || ''}
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          errorMsg={validationErrors.lastName}
          label={translations.labels.lastName}
          multiline={false}
          name='lastName'
          onBlur={(e) => handleBlur(e, lastName)}
          onChange={(e) => {
            const { value } = e.target
            setFormData((prevData) => ({
              ...prevData,
              lastName: value
            }))
            setGeneralData({
              ...generalData,
              data: {
                ...generalData.data,
                lastName: value
              },
              errors: generalData.errors
            })
          }}
          placeholder={t('Last Name')}
          required
          value={formData.lastName || ''}
          variant='outlined'
        />
      </div>
      <SelectGroup />
      <AppTextField
        className={classes.fullWidthInput}
        errorMsg={validationErrors.message}
        helperText={`${formData.message.length}/100`}
        label={translation.generalInfo.textFieldLabel}
        multiline
        name='message'
        onBlur={handleBlur}
        onChange={handleMessageChange}
        rows={5}
        value={formData.message}
      />
    </>
  )
}

export default TextFieldGroup
