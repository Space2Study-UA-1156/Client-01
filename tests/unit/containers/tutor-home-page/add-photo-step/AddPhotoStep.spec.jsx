import { screen, render } from '@testing-library/react'
import { vi } from 'vitest'
import { StepProvider } from '~/context/step-context'
import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('~/components/file-uploader/FileUploader', () => ({
  default: ({ buttonText }) => <button>{buttonText}</button>
}))

describe('AddPhotoStep component test', () => {
  const btnsBox = (
    <>
      <button data-testid='btn1' />
      <button data-testid='btn2' />
    </>
  )

  beforeEach(() => {
    render(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <AddPhotoStep btnsBox={btnsBox} />
      </StepProvider>
    )
  })

  it('should render container', () => {
    const uploadButton = screen.getByText('becomeTutor.photo.button')
    expect(uploadButton).toBeInTheDocument()
  })
  it('buttons passed in props should be in the document', () => {
    expect(screen.getByTestId('btn1')).toBeInTheDocument()
    expect(screen.getByTestId('btn2')).toBeInTheDocument()
  })
})
