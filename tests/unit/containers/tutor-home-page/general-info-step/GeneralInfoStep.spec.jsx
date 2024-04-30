import { renderWithProviders } from '~tests/test-utils'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { screen } from '@testing-library/react'

describe('GeneralInfoStep test', () => {
  const buttons = (
    <>
      <button>Button 1</button>
      <button>Button 2</button>
    </>
  )

  it('GeneralInfoStep container renders', () => {
    renderWithProviders(<GeneralInfoStep btnsBox={buttons} />)
    const title = screen.getByText('GeneralInfo step')
    expect(title).toBeInTheDocument()
  })

  it('Check if the buttons passed in props is in the document', () => {
    renderWithProviders(<GeneralInfoStep btnsBox={buttons} />)
    const button1 = screen.getByText('Button 1')
    const button2 = screen.getByText('Button 2')
    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
  })
})
