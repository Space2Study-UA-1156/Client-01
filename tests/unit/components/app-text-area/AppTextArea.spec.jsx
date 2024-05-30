import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import AppTextArea from '~/components/app-text-area/AppTextArea'

describe('AppTextArea test', () => {
  it('should render title if passed via props', () => {
    const props = {
      title: 'Test Title',
      value: 'Test Value'
    }
    render(<AppTextArea {...props} />)
    const titleElement = screen.getByText(props.title)
    expect(titleElement).toBeInTheDocument()
  })

  it('should not render title if title prop is not passed', () => {
    render(<AppTextArea />)
    const titleElement = screen.queryByRole('heading', { name: /Test Title/i })
    expect(titleElement).not.toBeInTheDocument()
  })
})
