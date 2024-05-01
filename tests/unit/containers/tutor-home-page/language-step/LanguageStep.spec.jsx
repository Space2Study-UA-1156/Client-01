import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

describe('LanguageStep test', () => {
  const buttons = (
    <>
      <button>Button 1</button>
      <button>Button 2</button>
    </>
  )

  beforeEach(() => {
    renderWithProviders(<LanguageStep btnsBox={buttons} />)
  })

  it('LanguageStep container renders', () => {
    const title = screen.getByText('Language step')
    expect(title).toBeInTheDocument()
  })

  it('Check if the buttons passed in props is in the document', () => {
    const button1 = screen.getByText('Button 1')
    const button2 = screen.getByText('Button 2')
    expect(button1).toBeInTheDocument()
    expect(button2).toBeInTheDocument()
  })
})
