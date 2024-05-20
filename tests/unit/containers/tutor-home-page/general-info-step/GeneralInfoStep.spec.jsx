import { render, screen } from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
describe('GeneralInfoStep Component', () => {
  const mockBtnsBox = <div>Mock Buttons</div>

  it('renders without crashing', () => {
    render(<GeneralInfoStep btnsBox={mockBtnsBox} />)
  })

  it('displays ImageSection component', () => {
    render(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    const imageSection = screen.getByTestId('image-section')
    expect(imageSection).toBeInTheDocument()
  })

  it('displays FormSection component', () => {
    render(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    const formSection = screen.getByTestId('form-section')
    expect(formSection).toBeInTheDocument()
  })

  it('displays passed buttons in FormSection', () => {
    render(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    const passedButtons = screen.getByText('Mock Buttons')
    expect(passedButtons).toBeInTheDocument()
  })
})
