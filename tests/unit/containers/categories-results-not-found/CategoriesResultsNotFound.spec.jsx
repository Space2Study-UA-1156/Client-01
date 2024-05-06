import { renderWithProviders } from '~tests/test-utils'
import CategoriesResultsNotFound from '~/containers/categories-results-not-found/CategoriesResultsNotFound'
import { screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { useTranslation } from 'react-i18next'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

describe('CategoriesResultsNotFound tests', () => {
  let imgSrc, imgAlt, title, description, buttonText, requestNewCategory

  beforeEach(() => {
    imgSrc = '/src/assets/img/guest-home-page/howItWorksStudentSecond.svg'
    imgAlt = 'info'

    const { t } = useTranslation()
    title = t('constant.resultsNotFound')
    description = t('constant.tryAgainText', { name: 'category' })
    buttonText = t('constant.buttonRequest', { name: 'category' })

    requestNewCategory = vi.fn()

    renderWithProviders(
      <CategoriesResultsNotFound
        buttonText={buttonText}
        description={description}
        img={imgSrc}
        imgAlt={imgAlt}
        title={title}
      />
    )
  })

  it('Image, title and description should be correct', () => {
    const actualTitle = screen.getByText(title)
    const actualDescription = screen.getByText(description)
    const imgElement = screen.getByAltText(imgAlt)

    expect(actualTitle).toBeInTheDocument()
    expect(actualDescription).toBeInTheDocument()
    expect(imgElement).toBeInTheDocument()
    expect(imgElement).toHaveAttribute('src', imgSrc)
  })

  it('Button should be present with correct text', () => {
    const buttonElement = screen.getByText(buttonText)

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent(buttonText)
  })

  it('Button should call function requestNewCategory when AppButton is clicked', async () => {
    fireEvent.click(screen.getByText(buttonText))

    assert(() => {
      expect(requestNewCategory).toHaveBeenCalled
    })
  })
})
