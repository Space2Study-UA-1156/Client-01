import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import FindOffers from '~/pages/find-offers/FindOffers'
import { ModalProvider } from '~/context/modal-context'

const mockCloseModal = vi.fn()

vi.mock('~/context/modal-context', () => ({
  ModalProvider: ({ children }) => <div>{children}</div>,
  useModalContext: () => ({
    closeModal: mockCloseModal
  })
}))

describe('FindOffers component', () => {
  it('renders the Find Offers page', async () => {
    render(
      <ModalProvider>
        <FindOffers />
      </ModalProvider>
    )
    expect(await screen.findByText('Find offers')).toBeInTheDocument()
  })
})
