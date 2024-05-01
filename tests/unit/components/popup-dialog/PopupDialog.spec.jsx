import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { vi } from 'vitest'
import { ConfirmationDialogProvider } from '~/context/confirm-context'

vi.mock('~/context/confirm-context', () => {
  const setNeedConfirmation = vi.fn()
  const openDialog = vi.fn()
  const needConfirmation = false
  return {
    __esModule: true,
    ConfirmationDialogContext: vi.createContext({
      setNeedConfirmation,
      openDialog,
      needConfirmation
    }),
    ConfirmationDialogProvider: ({ children }) => <div>{children}</div>
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

vi.mock('~/hooks/useBreakpoints', () => ({
  __esModule: true,
  default: () => ({
    isDesktop: true,
    isLaptopAndAbove: true,
    isLaptop: false,
    isTablet: false,
    isMobile: false
  })
}))

describe('PopupDialog', () => {
  let mockCloseModal
  let mockCloseModalAfterDelay

  beforeEach(() => {
    mockCloseModal = vi.fn()
    mockCloseModalAfterDelay = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders the dialog with provided content', async () => {
    render(
      <ConfirmationDialogProvider>
        <PopupDialog
          closeModal={mockCloseModal}
          closeModalAfterDelay={mockCloseModalAfterDelay}
          content={<div>Test Content</div>}
        />
      </ConfirmationDialogProvider>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('closes the dialog when close button is clicked', async () => {
    render(
      <ConfirmationDialogProvider>
        <PopupDialog
          closeModal={mockCloseModal}
          closeModalAfterDelay={mockCloseModalAfterDelay}
          content={<div />}
        />
      </ConfirmationDialogProvider>
    )
    await userEvent.click(screen.getByRole('button', { name: /close/i }))
    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })
  it('closes the dialog after a delay when clicked', async () => {
    let timerId
    render(
      <ConfirmationDialogProvider>
        <PopupDialog
          closeModal={mockCloseModal}
          closeModalAfterDelay={mockCloseModalAfterDelay}
          content={<div />}
          timerId={timerId}
        />
      </ConfirmationDialogProvider>
    )
    userEvent.click(screen.getByRole('button', { name: /close/i }))
    timerId = setTimeout(() => {
      mockCloseModal()
    }, 5000)
    vi.advanceTimersByTime(5000)
    await waitFor(() => expect(mockCloseModal).toHaveBeenCalled())
  })
})
