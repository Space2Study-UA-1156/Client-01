import ImageSection from '~/containers/tutor-home-page/general-info-step/ImageSection'
import { render, screen } from '@testing-library/react'

describe('ImageSection Component', () => {
  it('renders without crashing', () => {
    render(<ImageSection />)
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
  })
})
