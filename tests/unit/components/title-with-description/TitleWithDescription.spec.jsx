import { renderWithProviders } from '~tests/test-utils'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { screen } from '@testing-library/react'

describe('TitleWithDescription test', () => {
  it('Title and description should be correct', () => {
    const title = 'Test title'
    const description = 'Test description'
    renderWithProviders(
      <TitleWithDescription description={description} title={title} />
    )
    const actualTitle = screen.getByText(title)
    const actualDescription = screen.getByText(description)
    expect(actualTitle).toBeInTheDocument()
    expect(actualDescription).toBeInTheDocument()
  })
})
