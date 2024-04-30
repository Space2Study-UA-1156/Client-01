import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { ModalProvider } from '~/context/modal-context'
import Categories from '~/pages/categories/Categories'

const mockCloseModal = vi.fn()

vi.mock('~/context/modal-context', () => ({
  ModalProvider: ({ children }) => <div>{children}</div>,
  useModalContext: () => ({
    closeModal: mockCloseModal
  })
}))

describe('Categories', () => {
  it('renders correctly', async () => {
    render(
      <ModalProvider>
        <Categories />
      </ModalProvider>
    )

    expect(await screen.findByText('Categories')).toBeInTheDocument()
  })
})
