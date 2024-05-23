import { useEffect, useState } from 'react'
import {
  firstName,
  lastName,
  professionalSummary,
  language
} from '~/utils/validations/stepper'

const useValidateSteps = (stepLabels, stepData, handleStepData) => {
  // eslint-disable-next-line no-unused-vars
  const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

  const [stepsWithErrors, setStepsWithErrors] = useState(() => new Set())

  const handleFieldValidation = (step, field, error) => {
    handleStepData(step, {}, { [field]: error })
    return error
  }

  const validators = {
    [generalLabel]: [
      (data) =>
        handleFieldValidation(
          generalLabel,
          'firstName',
          firstName(data.firstName)
        ),
      (data) =>
        handleFieldValidation(
          generalLabel,
          'lastName',
          lastName(data.lastName)
        ),
      (data) =>
        handleFieldValidation(
          generalLabel,
          'professionalSummary',
          professionalSummary(data.professionalSummary)
        )
    ],
    [languageLabel]: [
      (data) =>
        handleFieldValidation(
          languageLabel,
          'language',
          language(data.language)
        )
    ]
  }

  const addStepError = (step) => {
    setStepsWithErrors((prev) => new Set(prev).add(step))
  }

  const removeStepError = (step) => {
    setStepsWithErrors((prev) => {
      const next = new Set(prev)
      next.delete(step)
      return next
    })
  }

  useEffect(() => {
    stepLabels.forEach((step) => {
      if (stepData[step].errors) {
        Object.values(stepData[step].errors).every((error) => !error) &&
          removeStepError(step)
      }
    })
  }, [stepData, stepLabels])

  const validateStep = (label) => {
    const stepValidators = validators[label]
    if (!stepValidators) return true

    const { data } = stepData[label]
    let isStepValid = true

    stepValidators.forEach((validator) => {
      const error = validator(data)
      if (error) {
        isStepValid = false
        addStepError(label)
      }
    })

    if (isStepValid) removeStepError(label)

    return isStepValid
  }

  const validateAllSteps = () => {
    let allStepsValid = true

    stepLabels.forEach((label) => {
      const isStepValid = validateStep(label)
      if (!isStepValid) {
        allStepsValid = false
      }
    })

    return allStepsValid
  }

  return { stepsWithErrors, validateAllSteps }
}

export default useValidateSteps
