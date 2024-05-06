import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { vi } from 'vitest'
import { student, tutor } from '~/constants'
import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'

vi.mock('~/components/app-button/AppButton', () => ({
  default: ({ children, onClick }) => {
    return <button onClick={onClick}>{children}</button>
  }
}))

vi.mock('~/components/app-drawer/AppDrawer', () => ({
  default: () => {
    return <div>AppDrawer</div>
  }
}))

vi.mock('~/components/title-with-description/TitleWithDescription', () => ({
  default: ({ title }) => <h2>{title}</h2>
}))

const mockedOpenDrawer = vi.fn()

vi.mock('~/hooks/use-drawer', () => ({
  useDrawer: () => ({
    openDrawer: mockedOpenDrawer
  })
}))

describe('CreateRequestOffer container ', () => {
  const mockStudentState = {
    appMain: { userRole: student }
  }

  const mockTutorState = {
    appMain: { userRole: tutor }
  }

  it('should display correct title for a student', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockStudentState
    })

    const heading = screen.getByRole('heading', {
      name: 'findOffers.offerRequestBlock.title.student'
    })

    expect(heading).toBeInTheDocument()
  })

  it('should display correct button label for a student', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockStudentState
    })

    const button = screen.getByRole('button', {
      name: 'findOffers.offerRequestBlock.button.student'
    })

    expect(button).toBeInTheDocument()
  })

  it('should display correct title for a tutor', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockTutorState
    })

    const heading = screen.getByRole('heading', {
      name: 'findOffers.offerRequestBlock.title.tutor'
    })

    expect(heading).toBeInTheDocument()
  })

  it('should display correct button label for a tutor', () => {
    renderWithProviders(<CreateRequestOffer />, {
      preloadedState: mockTutorState
    })

    const button = screen.getByRole('button', {
      name: 'findOffers.offerRequestBlock.button.tutor'
    })

    expect(button).toBeInTheDocument()
  })

  it('should call openDrawer on button click', () => {
    renderWithProviders(<CreateRequestOffer />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockedOpenDrawer).toHaveBeenCalled()
  })
})
