import { screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { student } from '~/constants'
import AccountIcon from '~/containers/navigation-icons/user-icons/AccountIcon'

vi.mock('~/hooks/use-axios', () => ({
  default: () => ({
    response: userMock,
    error: null,
    loading: false,
    fetchData: fetchDataMock
  })
}))

vi.mock('@mui/material/Avatar', () => ({
  default: ({ src, alt }) => <img alt={alt} data-testid='avatar' src={src} />
}))

vi.mock('~/components/navigation-icon/NavigationIcon', () => ({
  default: ({ icon }) => <button>{icon}</button>
}))

const initialState = {
  appMain: { userRole: student, isUserUpdated: false, userId: '1561' }
}

const userUpdatedState = {
  appMain: { userRole: student, isUserUpdated: true, userId: '1561' }
}

const userMock = {
  firstName: 'firstName',
  lastName: 'lastName',
  photo: ''
}

const fetchDataMock = vi.fn()

describe('AccountIcon component', () => {
  it('should render user avatar', () => {
    renderWithProviders(<AccountIcon />, {
      preloadedState: initialState
    })

    const avatar = screen.getByTestId('avatar')

    expect(avatar).toHaveAttribute('src', userMock.photo)
    expect(avatar).toBeInTheDocument()
  })

  it('should refetch data when the user is updated', () => {
    renderWithProviders(<AccountIcon />, {
      preloadedState: userUpdatedState
    })

    expect(fetchDataMock).toHaveBeenCalled()
  })
})
