import { render, screen } from '@testing-library/react'

import VideoBox from '~/components/video-box/VideoBox'

describe('VideoBox component', () => {
  it('should render video', () => {
    const src = 'src'

    render(<VideoBox video={src} />)

    const video = screen.getByAltText('Video')

    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('src', src)
  })
})
