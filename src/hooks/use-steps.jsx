import { useCallback, useState } from 'react'

import { useSelector } from 'react-redux'
import useAxios from '~/hooks/use-axios'

import { snackbarVariants } from '~/constants'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { useStepContext } from '~/context/step-context'
import useValidateSteps from './use-validate-steps'

const useSteps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { stepData, handleStepData } = useStepContext()
  const { stepsWithErrors, validateAllSteps } = useValidateSteps(
    steps,
    stepData,
    handleStepData
  )
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

  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleStepChange = (step) => {
    setActiveStep(step)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = () => {
    const [generalLabel, subjectLabel, languageLabel, photoLabel] = steps

    if (!validateAllSteps()) return

    fetchData({
      firstName: stepData[generalLabel].data.firstName,
      lastName: stepData[generalLabel].data.lastName,
      address: {
        country: stepData[generalLabel].data.country,
        city: stepData[generalLabel].data.city
      },
      professionalSummary: stepData[generalLabel].data.professionalSummary,
      mainSubjects: stepData[subjectLabel],
      nativeLanguage: stepData[languageLabel].data.language,
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
    stepsWithErrors,
    isLastStep,
    stepOperation,
    loading
  }
}

export default useSteps
