import { renderWithProviders } from '~tests/test-utils'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { screen } from '@testing-library/react'

describe('LanguageStep test', () => {
  const buttons = (
    <>
      <button>Button 1</button>
      <button>Button 2</button>
    </>
  )

  it('LanguageStep container renders', () => {
    renderWithProviders(<LanguageStep btnsBox={buttons} />)
    const title = screen.getByText('Language step')
    expect(title).toBeInTheDocument()
  })

  it('Check if the buttons passed in props is in the document', () => {
    renderWithProviders(<LanguageStep btnsBox={buttons} />)
    const button1 = screen.getByText('Button 1')
    const button2 = screen.getByText('Button 2')
    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
  })
})
