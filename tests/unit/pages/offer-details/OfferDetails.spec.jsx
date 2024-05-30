import { render, screen } from '@testing-library/react'
import { ModalProvider } from '~/context/modal-context'
import OfferDetails from '~/pages/offer-details/OfferDetails'

vi.mock('~/context/modal-context', () => ({
  useModalContext: () => ({
    openModal: vi.fn(),
    closeModal: vi.fn()
  }),
  ModalProvider: ({ children }) => <div>{children}</div>
}))

it('renders OfferDetails page', () => {
  render(
    <ModalProvider>
      <OfferDetails />
    </ModalProvider>
  )
  expect(screen.getByText('OfferDetails Page')).toBeInTheDocument()
})
