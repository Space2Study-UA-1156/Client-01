import { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import useAxios from '~/hooks/use-axios'

import { snackbarVariants } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { useStepContext } from '~/context/step-context'
import {
  firstName,
  lastName,
  professionalSummary
} from '~/utils/validations/stepper'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [erroredSteps, setErroredSteps] = useState(() => new Set())
  const { stepData, stepLabels, handleStepData } = useStepContext()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { userId } = useSelector((state) => state.appMain)

  const setStepError = (step) => {
    setErroredSteps((prev) => new Set(prev).add(step))
  }

  const deleteStepError = (step) => {
    setErroredSteps((prev) => {
      const next = new Set(prev)
      next.delete(step)
      return next
    })
  }

  useEffect(() => {
    const [generalLabel] = stepLabels
    const { errors } = stepData[generalLabel]
    Object.values(errors).every((error) => !error) && deleteStepError(0)
  }, [stepData, stepLabels])

  const updateUser = useCallback(
    (data) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponseError = (error) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'becomeTutor.successMessage'
    })
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const isStepperDataValid = () => {
    const [generalLabel] = stepLabels
    let result = true

    const { data } = stepData[generalLabel]

    const firstNameError = firstName(data.firstName)
    const lastNameError = lastName(data.lastName)
    const professionalSummaryError = professionalSummary(
      data.professionalSummary
    )

    if (firstNameError || lastNameError || professionalSummaryError) {
      result = false
      setStepError(0)
    }

    handleStepData(
      generalLabel,
      {},
      {
        firstName: firstNameError,
        lastName: lastNameError,
        professionalSummary: professionalSummaryError
      }
    )

    return result
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels

    if (!isStepperDataValid()) return

    fetchData({
      firstName: stepData[generalLabel].data.firstName,
      lastName: stepData[generalLabel].data.lastName,
      address: {
        country: stepData[generalLabel].data.country,
        city: stepData[generalLabel].data.city
      },
      professionalSummary: stepData[generalLabel].data.professionalSummary,
      mainSubjects: stepData[subjectLabel],
      nativeLanguage: stepData[languageLabel],
      photo: stepData[photoLabel].at(0)
    })
  }

  const stepOperation = {
    next,
    back,
    handleSubmit,
    handleStepChange
  }

  return {
    activeStep,
    erroredSteps,
    isLastStep,
    stepOperation,
    loading
  }
}

export default useSteps
