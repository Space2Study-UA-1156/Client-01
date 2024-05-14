import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { useStepContext } from '~/context/step-context'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isLaptopAndAbove: true,
    isTablet: false,
    isMobile: false
  })
}))

const handleStepDataMock = vi.fn()
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn(() => ({
    handleStepData: handleStepDataMock,
    stepData: { photo: [] }
  }))
}))

const emitterMock = vi.fn()
vi.mock('~/components/file-uploader/FileUploader', () => ({
  default: ({ emitter, initialError }) => (
    <div>
      <input
        data-testid='file-uploader'
        onChange={() => emitter(emitterMock())}
        type='file'
      />

      {initialError && <span data-testid='error'>{initialError}</span>}
    </div>
  )
}))

vi.mock('~/components/drag-and-drop/DragAndDrop', () => ({
  default: ({ children }) => {
    return <div>{children}</div>
  }
}))

vi.mock('~/utils/image-resize', () => ({
  imageResize: async () => 'base64ImageUrl'
}))

describe('AddPhotoStep component test', () => {
  const btnsBox = (
    <>
      <button data-testid='btn1' />
      <button data-testid='btn2' />
    </>
  )

  it('should render fileUploader', () => {
    render(<AddPhotoStep btnsBox={btnsBox} />)

    const fileUploader = screen.getByTestId('file-uploader')

    expect(fileUploader).toBeInTheDocument()
  })

  it('buttons passed in props should be in the document', () => {
    render(<AddPhotoStep btnsBox={btnsBox} />)

    expect(screen.getByTestId('btn1')).toBeInTheDocument()
    expect(screen.getByTestId('btn2')).toBeInTheDocument()
  })

  it('should render photo preview if file is selected', () => {
    const mockedContextValue = {
      stepData: {
        photo: [{ name: 'image.jpg', src: 'data:image/png' }]
      }
    }
    useStepContext.mockReturnValueOnce(mockedContextValue)
    render(<AddPhotoStep btnsBox={btnsBox} />)

    const photoPreview = screen.getByAltText('becomeTutor.photo.imageAlt')

    expect(photoPreview).toBeInTheDocument()
  })

  it('should render DragAndDrop component if file is not selected', () => {
    render(<AddPhotoStep btnsBox={btnsBox} />)

    const dragEndDrop = screen.getByText('becomeTutor.photo.placeholder')

    expect(dragEndDrop).toBeInTheDocument()
  })

  it('should render error message in case of validation error', () => {
    const ERROR_MESSAGE = 'error'
    const FILES = []
    emitterMock.mockReturnValue({ error: ERROR_MESSAGE, files: FILES })

    render(<AddPhotoStep btnsBox={btnsBox} />)

    const fileUploader = screen.getByTestId('file-uploader')
    fireEvent.change(fileUploader)

    const errorMessage = screen.getByTestId('error')

    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent(ERROR_MESSAGE)
  })

  it('should reset photo state and error message if selected file was successfully deleted', () => {
    const ERROR_MESSAGE = null
    const FILES = []
    emitterMock.mockReturnValue({ error: ERROR_MESSAGE, files: FILES })

    render(<AddPhotoStep btnsBox={btnsBox} />)

    const fileUploader = screen.getByTestId('file-uploader')
    fireEvent.change(fileUploader)

    const errorMessage = screen.queryByTestId('error')

    expect(errorMessage).toBeNull()
    expect(handleStepDataMock).toHaveBeenCalledWith('photo', FILES)
  })

  it('should add photo in StepContext if there is no error', async () => {
    window.URL.createObjectURL = vi.fn()

    const ERROR_MESSAGE = ''
    const FILES = [{ name: 'image.png' }]
    emitterMock.mockReturnValue({ error: ERROR_MESSAGE, files: FILES })

    render(<AddPhotoStep btnsBox={btnsBox} />)

    const fileUploader = screen.getByTestId('file-uploader')
    fireEvent.change(fileUploader)

    await waitFor(() => {
      const errorMessage = screen.queryByTestId('error')
      expect(errorMessage).toBeNull()
      expect(handleStepDataMock).toHaveBeenCalled()
    })
  })
})
