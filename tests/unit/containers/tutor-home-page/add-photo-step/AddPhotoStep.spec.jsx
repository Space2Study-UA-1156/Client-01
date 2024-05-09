import { screen, render } from '@testing-library/react'
import { vi } from 'vitest'
import { StepProvider, useStepContext } from '~/context/step-context'
import {
  initialValues,
  tutorStepLabels
} from '~/components/user-steps-wrapper/constants'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isLaptopAndAbove: true
  })
}))

vi.mock('~/context/step-context', async (importOriginal) => {
  const mod = await importOriginal()

  return {
    ...mod,
    useStepContext: vi.fn(() => ({
      stepData: { photo: [] }
    }))
  }
})

vi.mock('~/components/file-uploader/FileUploader', () => ({
  default: ({ buttonText }) => <button>{buttonText}</button>
}))

vi.mock('~/components/drag-and-drop/DragAndDrop', () => ({
  default: () => <div>DragAndDrop</div>
}))

describe('AddPhotoStep component test', () => {
  window.URL.createObjectURL = vi.fn()

  const btnsBox = (
    <>
      <button data-testid='btn1' />
      <button data-testid='btn2' />
    </>
  )

  it('should render container', () => {
    render(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <AddPhotoStep btnsBox={btnsBox} />
      </StepProvider>
    )

    const uploadButton = screen.getByText('becomeTutor.photo.button')
    expect(uploadButton).toBeInTheDocument()
  })

  it('buttons passed in props should be in the document', () => {
    render(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <AddPhotoStep btnsBox={btnsBox} />
      </StepProvider>
    )

    expect(screen.getByTestId('btn1')).toBeInTheDocument()
    expect(screen.getByTestId('btn2')).toBeInTheDocument()
  })

  it('should render photo preview if file is selected', () => {
    const mockedContextValue = {
      stepData: {
        photo: [{ name: 'image.jpg' }]
      }
    }
    useStepContext.mockReturnValue(mockedContextValue)

    render(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <AddPhotoStep btnsBox={btnsBox} />
      </StepProvider>
    )

    const photoPreview = screen.getByAltText('becomeTutor.photo.imageAlt')

    expect(photoPreview).toBeInTheDocument()
  })

  it('should render DragAndDrop component if file is not selected', () => {
    const mockedContextValue = {
      stepData: {
        photo: []
      }
    }
    useStepContext.mockReturnValue(mockedContextValue)

    render(
      <StepProvider initialValues={initialValues} stepLabels={tutorStepLabels}>
        <AddPhotoStep btnsBox={btnsBox} />
      </StepProvider>
    )

    const dragEndDrop = screen.getByText('DragAndDrop')

    expect(dragEndDrop).toBeInTheDocument()
  })
})
