// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import PopupDialog from '~/components/popup-dialog/PopupDialog'
// import { vi } from 'vitest'
//
// describe('PopupDialog', () => {
//   let mockCloseModal
//   let mockCloseModalAfterDelay
//   let mockCheckConfirmation
//   let mockSetNeedConfirmation
//
//   beforeEach(() => {
//     mockCloseModal = vi.fn()
//     mockCloseModalAfterDelay = vi.fn()
//     mockCheckConfirmation = vi.fn()
//     mockSetNeedConfirmation = vi.fn()
//     vi.mock('~/hooks/use-confirm', () => ({
//       useConfirm: () => ({
//         checkConfirmation: mockCheckConfirmation,
//         setNeedConfirmation: mockSetNeedConfirmation
//       })
//     }))
//   })
//
//   it('renders the dialog with provided content', () => {
//     render(<PopupDialog content={<div>Test Content</div>} closeModal={mockCloseModal} />)
//     expect(screen.getByText('Test Content')).toBeInTheDocument()
//   })
//
//   it('clears close timeout when mouse hovers over the dialog', async () => {
//     const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
//     render(<PopupDialog content={<div />} timerId={123} closeModalAfterDelay={mockCloseModalAfterDelay} />)
//     const popupContent = screen.getByTestId('popupContent')
//     await userEvent.hover(popupContent)
//     expect(clearTimeoutSpy).toHaveBeenCalledWith(123)
//   })
// })
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { vi } from 'vitest'

vi.mock('~/hooks/use-confirm', () => ({
  // Ensure to mock the default export correctly
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
