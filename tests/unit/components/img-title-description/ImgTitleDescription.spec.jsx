import { render } from '@testing-library/react'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'

describe('ImgTitleDescription tests', () => {
  it('Should render image', () => {
    const imgSrc = 'image-source.jpg'
    const { getByAltText } = render(<ImgTitleDescription img={imgSrc} />)
    const imageElement = getByAltText('info')
    expect(imageElement).toBeInTheDocument()
    expect(imageElement).toHaveAttribute('src', imgSrc)
  })

  it('Should render title', () => {
    const titleText = 'Test Title'
    const { getByText } = render(<ImgTitleDescription title={titleText} />)
    const titleElement = getByText(titleText)
    expect(titleElement).toBeInTheDocument()
  })

  it('Should render description', () => {
    const descriptionText = 'Test Description'
    const { getByText } = render(
      <ImgTitleDescription description={descriptionText} />
    )
    const descriptionElement = getByText(descriptionText)
    expect(descriptionElement).toBeInTheDocument()
  })
})
