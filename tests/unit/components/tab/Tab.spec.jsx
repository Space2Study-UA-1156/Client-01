import { screen, render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Tab from '~/components/tab/Tab'

vi.mock('~/components/tab/Tab.styles', () => ({
  styles: {
    defaultTab: {},
    activeTab: 'active'
  }
}))

vi.mock('@mui/material/Button', () => ({
  __esModule: true,
  default: ({ onClick, children, sx }) => (
    <button className={sx[1]} onClick={onClick}>
      {children}
    </button>
  )
}))

const label = 'label'
const onClick = vi.fn()

describe('Tab component', () => {
  it('should render label', () => {
    render(<Tab>{label}</Tab>)

    const tabLabel = screen.getByText(label)

    expect(tabLabel).toBeInTheDocument()
  })

  it('should apply activeTab if activeTab prop is true', () => {
    render(<Tab activeTab>{label}</Tab>)

    const tabButton = screen.getByRole('button')

    expect(tabButton).toHaveClass('active')
  })

  it('should not apply activeTab if activeTab prop is false', () => {
    render(<Tab>{label}</Tab>)

    const tabButton = screen.getByRole('button')

    expect(tabButton).not.toHaveClass('active')
  })

  it('should call onClick handler when the tab is clicked', () => {
    render(<Tab onClick={onClick}>{label}</Tab>)

    const tabButton = screen.getByRole('button')
    fireEvent.click(tabButton)

    expect(onClick).toHaveBeenCalled()
  })
})
