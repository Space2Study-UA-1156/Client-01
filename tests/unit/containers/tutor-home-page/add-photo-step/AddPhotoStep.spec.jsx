import { screen } from '@testing-library/react'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import { renderWithProviders } from '~tests/test-utils'

describe('AddPhotoStep component test', () => {
  const btnsBox = (
    <>
      <button data-testid='btn1' />
      <button data-testid='btn2' />
    </>
  )

  beforeEach(() => {
    renderWithProviders(<AddPhotoStep btnsBox={btnsBox} />)
  })

  it('should render container', () => {
    const AddPhotoStepContainer = screen.getByText('AddPhoto step')
    expect(AddPhotoStepContainer).toBeInTheDocument()
  })
  it('buttons passed in props should be in the document', () => {
    expect(screen.getByTestId('btn1')).toBeInTheDocument()
    expect(screen.getByTestId('btn2')).toBeInTheDocument()
  })
})
