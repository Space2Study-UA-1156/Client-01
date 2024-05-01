import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

vi.mock('~/hooks/use-confirm', () => ({
  default: () => ({
    checkConfirmation: vi.fn(() => Promise.resolve(true))
  })
}))

vi.mock('~/hooks/use-breakpoints', () => ({
  default: () => ({
    isMobile: false
  })
}))

describe('PopupDialog', () => {
  let closeModalMock
  let closeModalAfterDelayMock
  let timerId

  beforeEach(() => {
    closeModalMock = vi.fn()
    closeModalAfterDelayMock = vi.fn()
    timerId = setTimeout(() => {}, 1000)
  })

  it('should display content text', () => {
    const content = 'Test Content'
    render(
      <PopupDialog
        closeModal={closeModalMock}
        closeModalAfterDelay={closeModalAfterDelayMock}
        content={content}
        timerId={timerId}
      />
    )
    expect(screen.getByText(content)).toBeInTheDocument()
  })

  it('closes the dialog when close button is clicked', async () => {
    render(
      <ConfirmationDialogProvider>
        <PopupDialog
          closeModal={closeModalMock}
          closeModalAfterDelay={closeModalAfterDelayMock}
          content={<div />}
        />
      </ConfirmationDialogProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    await waitFor(() => expect(closeModalMock).toHaveBeenCalled())
  })

  it('should close popup on mouse leave after delay', async () => {
    render(
      <PopupDialog
        closeModal={closeModalMock}
        closeModalAfterDelay={closeModalAfterDelayMock}
        content='Content'
        timerId={timerId}
      />
    )
    const popupContent = screen.getByTestId('popupContent')
    fireEvent.mouseOver(popupContent) // To cancel the timeout
    fireEvent.mouseLeave(popupContent)
    expect(closeModalAfterDelayMock).toHaveBeenCalled()
  })
})
