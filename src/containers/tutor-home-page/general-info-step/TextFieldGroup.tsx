import React, { useState, FocusEvent, useEffect } from 'react'
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
import { StepContextType } from '~/containers/tutor-home-page/general-info-step/interfaces/ITextFieldGroup'

const TextFieldGroup: React.FC = () => {
  const classes = useTextFieldGroupStyles()
  const { t } = useTranslation()
  const { setFormValidation, handleStepData, stepData, stepLabels } =
    useStepContext() as StepContextType

  const [generalStepLabel] = stepLabels
  const formData = stepData[generalStepLabel]

  const [summary, setSummary] = useState(formData.data.professionalSummary)

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
    const { value, name } = e.target as { value: string; name: keyof FormData }
    handleStepData(
      generalStepLabel,
      { [name]: value },
      { [name]: validationFn(value) }
    )
  }

  const handleSummaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 100)
    setSummary(value)
  }

  return (
    <>
      <div className={classes.inputRow}>
        <AppTextField
          className={classes.halfWidthInput}
          defaultValue={formData.data.firstName}
          errorMsg={t(formData.errors.firstName)}
          label={translations.labels.firstName}
          multiline={false}
          name='firstName'
          onBlur={(e) => handleBlur(e, firstName)}
          required
          variant='outlined'
        />
        <AppTextField
          className={classes.halfWidthInput}
          defaultValue={formData.data.lastName}
          errorMsg={t(formData.errors.lastName)}
          label={translations.labels.lastName}
          multiline={false}
          name='lastName'
          onBlur={(e) => handleBlur(e, lastName)}
          required
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
        onBlur={(e) =>
          handleBlur(e, professionalSummary as (value: string) => string)
        }
        onChange={handleSummaryChange}
        rows={5}
        value={summary}
      />
    </>
  )
}

export default TextFieldGroup
