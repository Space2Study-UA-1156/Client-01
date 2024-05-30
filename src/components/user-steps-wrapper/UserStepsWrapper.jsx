import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { markFirstLoginComplete } from '~/redux/reducer'
import { StepProvider } from '~/context/step-context'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import useConfirm from '~/hooks/use-confirm'
import {
  initialValues,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useDispatch()
  const { setNeedConfirmation } = useConfirm()

  useEffect(() => {
    setNeedConfirmation(true)
    dispatch(markFirstLoginComplete())
  }, [dispatch, setNeedConfirmation])

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <UserStepsContent
        isUserFetched={isUserFetched}
        setIsUserFetched={setIsUserFetched}
        stepLabels={stepLabels}
      />
    </StepProvider>
  )
}

const UserStepsContent = ({ isUserFetched, setIsUserFetched, stepLabels }) => {
  const childrenArr = [
    <GeneralInfoStep
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
    />,
    <SubjectsStep key='2' />,
    <LanguageStep key='3' />,
    <AddPhotoStep key='4' />
  ]

  return (
    <>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </>
  )
}

export default UserStepsWrapper
