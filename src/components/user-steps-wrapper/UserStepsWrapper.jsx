import { useCallback, useState, useEffect } from 'react'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { markFirstLoginComplete } from '~/redux/reducer'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { StepProvider } from '~/context/step-context'

import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'

import { useDispatch } from 'react-redux'
import {
  initialValues,
  studentStepLabels,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'
import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'

const UserStepsWrapper = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useDispatch()
  const [modal] = useState(null)
  const [timer, setTimer] = useState(null)
  const { closeModal } = useModalContext()
  const { setNeedConfirmation } = useConfirm()
  useEffect(() => {
    setNeedConfirmation(true)
    dispatch(markFirstLoginComplete())
  }, [dispatch, setNeedConfirmation])

  const closeModalAfterDelay = useCallback(
    (delay) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )
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

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
      {modal && (
        <PopupDialog
          closeModal={closeModal}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          timerId={timer}
        />
      )}
    </StepProvider>
  )
}

export default UserStepsWrapper
