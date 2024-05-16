import { useCallback, useState } from 'react'

import { useSelector } from 'react-redux'
import useAxios from '~/hooks/use-axios'

import { snackbarVariants } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { useStepContext } from '~/context/step-context'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [erroredSteps, setErroredSteps] = useState(() => new Set())
  const { stepData, stepLabels } = useStepContext()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { userId } = useSelector((state) => state.appMain)

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

  const next = () => {
    deleteStepError(activeStep)
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    deleteStepError(activeStep)
    setActiveStep((prev) => prev - 1)
  }

  const handleStepChange = (step) => {
    deleteStepError(activeStep)
    setActiveStep(step)
  }

  const isStepperDataValid = () => {
    // eslint-disable-next-line no-unused-vars
    const [generalLabel, subjectLabel, languageLabel, photoLabel] = stepLabels
    let result = true

    //=========================================================================
    // const { firstName, lastName, city, country } = stepData[generalLabel].data
    // if (!firstName || !lastName || !city || !country) {
    //   isValuesValid = false
    //   setStepError(0)
    // }
    //=========================================================================

    if (stepData[subjectLabel].length === 0) {
      result = false
      setStepError(1)
    }
    if (!stepData[languageLabel] || stepData[languageLabel]?.length === 0) {
      result = false
      setStepError(2)
    }
    if (stepData[photoLabel]?.length === 0) {
      result = false
      setStepError(3)
    }

    return result
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const [generalLabel, subjectLabel, languageLabel] = stepLabels

    if (!isStepperDataValid()) return

    fetchData({
      firstName: 'firstName',
      lastName: 'lastName',
      address: {
        country: 'country',
        city: 'city'
      },
      professionalSummary: 'professionalSummary',
      mainSubjects: stepData[subjectLabel],
      nativeLanguage: stepData[languageLabel]
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
