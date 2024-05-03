import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import { student, tutor } from '~/constants'

import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'

vi.mock('~/components/app-button/AppButton', () => ({
  __esModule: true,
  default: ({ children }) => <button>{children}</button>
}))

vi.mock('~/components/app-drawer/AppDrawer', () => ({
  __esModule: true,
  default: () => {
    return <div>AppDrawer</div>
  }
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: ({ title }) => <h2>{title}</h2>
}))

const mockStudentState = {
  appMain: { loading: true, userRole: student }
}

const mockTutorState = {
  appMain: { loading: true, userRole: tutor }
}

describe('CreateRequestOffer container ', () => {
  it('should display correct title for a student', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockStudentState
    })

    const heading = screen.getByText(
      'findOffers.offerRequestBlock.button.student'
    )

    expect(heading).toBeInTheDocument()
  })

  it('should display correct button label for a student', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockStudentState
    })

    const button = screen.getByText(
      'findOffers.offerRequestBlock.button.student'
    )

    expect(button).toBeInTheDocument()
  })

  it('should display correct title for a tutor', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockTutorState
    })

    const heading = screen.getByText(
      'findOffers.offerRequestBlock.button.tutor'
    )

    expect(heading).toBeInTheDocument()
  })

  it('should display correct button label for a tutor', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockTutorState
    })

    const button = screen.getByText('findOffers.offerRequestBlock.button.tutor')

    expect(button).toBeInTheDocument()
  })
})
