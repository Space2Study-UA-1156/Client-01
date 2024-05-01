import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Tab from '~/components/Tab/Tab'

const label = 'label'
const onClick = vi.fn()

vi.mock('@mui/material/Button', () => ({
  __esModule: true,
  default: ({ onClick, children, 'aria-selected': ariaSelected }) => {
    return (
      <button aria-selected={ariaSelected} onClick={onClick}>
        {children}
      </button>
    )
  }
}))

describe('Tab component', () => {
  it('shoud render label', () => {
    render(<Tab>{label}</Tab>)

    const tabLabel = screen.getByText(label)

    expect(tabLabel).toBeInTheDocument()
  })

  it('should apply activeTab if activeTab prop is true', () => {
    render(<Tab activeTab>{label}</Tab>)

    const tabButton = screen.getByRole('button')

    expect(tabButton).toHaveAttribute('aria-selected')
  })

  it('should not apply activeTab if activeTab prop is false', () => {
    render(<Tab>{label}</Tab>)

    const tabButton = screen.getByRole('button')

    expect(tabButton).not.toHaveAttribute('aria-selected')
  })

  it('should call onClick handler when the tab is clicked', () => {
    render(<Tab onClick={onClick}>{label}</Tab>)

    const tabButton = screen.getByRole('button')
    fireEvent.click(tabButton)

    expect(onClick).toHaveBeenCalled()
  })
})
