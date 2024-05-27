import { screen, fireEvent, render } from '@testing-library/react'
import ResultsNotFound from '~/components/results-not-found/ResultsNotFound'

vi.mock('~/components/img-title-description/ImgTitleDescription', () => ({
  default: ({ title, description, img }) => (
    <div>
      <img src={img} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}))

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  )
}))

const openModalMock = vi.fn()

vi.mock('~/context/modal-context', async () => {
  const actual = await vi.importActual('~/context/modal-context')

  return {
    ...actual,
    useModalContext: () => ({
      openModal: openModalMock
    })
  }
})

describe('ResultsNotFound tests', () => {
  it('should render title, description and button', () => {
    render(<ResultsNotFound />)

    const title = screen.getByRole('heading', {
      name: 'constant.resultsNotFound'
    })
    const description = screen.getByText('constant.tryAgainText')
    const button = screen.getByText('constant.buttonRequest')

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should open modal when the button is clicked', () => {
    const dialogMock = <div>Dialog</div>
    render(<ResultsNotFound dialog={dialogMock} />)

    const button = screen.getByText('constant.buttonRequest')
    fireEvent.click(button)

    expect(openModalMock).toHaveBeenCalled()
    expect(openModalMock).toHaveBeenCalledWith({
      component: dialogMock
    })
  })
})
