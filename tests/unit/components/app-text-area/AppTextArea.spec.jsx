import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it } from 'vitest'
import AppTextArea from '~/components/app-text-area/AppTextArea'

describe('AppTextArea test', () => {
  beforeEach(() => {
    render(<AppTextArea />)
  })

  it('should render title if passed via props', () => {
    const props = {
      title: 'Test Title',
      value: 'Test Value'
    }
    render(<AppTextArea {...props} />)
    const titleElement = screen.getByText(/Test Title/i)
    expect(titleElement).toBeInTheDocument()
  })

  it('should not render title if title prop is not passed', () => {
    const titleElement = screen.queryByText(/Test Title/i)
    expect(titleElement).not.toBeInTheDocument()
  })
})
