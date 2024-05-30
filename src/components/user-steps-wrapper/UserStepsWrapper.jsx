import { useCallback, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import { markFirstLoginComplete } from '~/redux/reducer'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { StepProvider, useStepContext } from '~/context/step-context'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import useConfirm from '~/hooks/use-confirm'
import { useModalContext } from '~/context/modal-context'
import { userService } from '~/services/user-service'
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
  const { generalData } = useStepContext()
  const { closeModal } = useModalContext()
  const [modal] = useState(null)
  const [timer, setTimer] = useState(null)

  const closeModalAfterDelay = useCallback(
    (delay) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  const saveDataToBackend = useCallback(async () => {
    try {
      await userService.updateUser(generalData.data.userId, generalData.data)
    } catch (error) {
      console.error('Error saving user data:', error)
    }
  }, [generalData.data])

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
      <StepWrapper onStepChange={saveDataToBackend} steps={stepLabels}>
        {childrenArr}
      </StepWrapper>
      {modal && (
        <PopupDialog
          closeModal={closeModal}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          timerId={timer}
        />
      )}
    </>
  )
}

export default UserStepsWrapper
