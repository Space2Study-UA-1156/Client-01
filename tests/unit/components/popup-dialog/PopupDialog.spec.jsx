// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import PopupDialog from '~/components/popup-dialog/PopupDialog'
// import { vi } from 'vitest'
//
// vi.mock('~/hooks/use-confirm', () => ({
//   __esModule: true,
//   default: () => ({
//     checkConfirmation: vi.fn().mockResolvedValue(true),
//     setNeedConfirmation: vi.fn(),
//     openDialog: vi.fn()
//   })
// }))
//
// describe('PopupDialog', () => {
//   let mockCloseModal
//   let mockCloseModalAfterDelay
//
//   beforeEach(() => {
//     mockCloseModal = vi.fn()
//     mockCloseModalAfterDelay = vi.fn()
//   })
//
//   it('renders the dialog with provided content', async () => {
//     render(
//       <PopupDialog
//         closeModal={mockCloseModal}
//         content={<div>Test Content</div>}
//       />
//     )
//     expect(screen.getByText('Test Content')).toBeInTheDocument()
//   })
//
//   it('closes the dialog when close button is clicked and confirmation is true', async () => {
//     render(<PopupDialog closeModal={mockCloseModal} content={<div />} />)
//     await userEvent.click(screen.getByRole('button'))
//     expect(mockCloseModal).toHaveBeenCalled()
//   })
//
//   it('clears close timeout when mouse hovers over the dialog', async () => {
//     const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
//     render(
//       <PopupDialog
//         closeModalAfterDelay={mockCloseModalAfterDelay}
//         content={<div />}
//         timerId={123}
//       />
//     )
//     const popupContent = screen.getByTestId('popupContent')
//     await userEvent.hover(popupContent)
//     expect(clearTimeoutSpy).toHaveBeenCalledWith(123)
//   })
// })
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { vi } from 'vitest'

vi.mock('~/context/confirm-context', () => ({
  __esModule: true,
  ConfirmationDialogContext: {
    Provider: ({ children }) => children,
    Consumer: ({ children }) =>
      children({ setNeedConfirmation: vi.fn(), openDialog: vi.fn() })
  }
}))

vi.mock('~/hooks/use-confirm', () => ({
  __esModule: true,
  default: () => ({
    checkConfirmation: vi.fn().mockResolvedValue(true),
    setNeedConfirmation: vi.fn(),
    openDialog: vi.fn()
  })
}))

describe('PopupDialog', () => {
  let mockCloseModal
  let mockCloseModalAfterDelay

  beforeEach(() => {
    mockCloseModal = vi.fn()
    mockCloseModalAfterDelay = vi.fn()
  })

  it('renders the dialog with provided content', async () => {
    render(
      <PopupDialog
        closeModal={mockCloseModal}
        content={<div>Test Content</div>}
      />
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('closes the dialog when close button is clicked and confirmation is true', async () => {
    render(<PopupDialog closeModal={mockCloseModal} content={<div />} />)
    await userEvent.click(screen.getByRole('button'))
    expect(mockCloseModal).toHaveBeenCalled()
  })

  it('clears close timeout when mouse hovers over the dialog', async () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
    render(
      <PopupDialog
        closeModalAfterDelay={mockCloseModalAfterDelay}
        content={<div />}
        timerId={123}
      />
    )
    const popupContent = screen.getByTestId('popupContent')
    await userEvent.hover(popupContent)
    expect(clearTimeoutSpy).toHaveBeenCalledWith(123)
  })
})
