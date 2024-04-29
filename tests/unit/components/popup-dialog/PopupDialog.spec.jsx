import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { vi } from 'vitest'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

vi.mock('~/context/confirm-context', () => {
  const setNeedConfirmation = vi.fn()
  const openDialog = vi.fn()
  const needConfirmation = false
  const ConfirmationDialogContext = {
    setNeedConfirmation,
    openDialog,
    needConfirmation
  }
  return {
    __esModule: true,
    ConfirmationDialogContext: vi.createContext(ConfirmationDialogContext),
    ConfirmationDialogProvider: ({ children }) => children
  }
})

vi.mock('~/hooks/use-confirm', () => {
  const checkConfirmation = vi.fn().mockResolvedValue(true)
  const setNeedConfirmation = vi.fn()
  const openDialog = vi.fn()

  return {
    __esModule: true,
    default: () => ({
      checkConfirmation,
      setNeedConfirmation,
      openDialog
    })
  }
})

describe('PopupDialog', () => {
  let mockCloseModalAfterDelay

  beforeEach(() => {
    vi.resetAllMocks()
    mockCloseModalAfterDelay = vi.fn()
  })

  it('triggers close modal after delay when mouse leaves the dialog', async () => {
    const setTimeoutSpy = vi.spyOn(global, 'setTimeout')
    render(
      <ConfirmationDialogProvider>
        <PopupDialog
          closeModalAfterDelay={mockCloseModalAfterDelay}
          content={<div />}
        />
      </ConfirmationDialogProvider>
    )
    const popupContents = screen.getAllByTestId('popupContent')
    await userEvent.unhover(popupContents[0])
    await waitFor(() => expect(setTimeoutSpy).toHaveBeenCalled())
  })
})
