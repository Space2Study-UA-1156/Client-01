import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { useSelector } from 'react-redux'
import { useModalContext } from '~/context/modal-context'
import StudentHome from '~/pages/student-home/StudentHome'

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useSelector: vi.fn()
  }
})

vi.mock('~/context/modal-context', () => ({
  useModalContext: vi.fn()
}))

vi.mock('@mui/material/Box', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <div {...props}>{children}</div>
}))

vi.mock('@mui/material/Container', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <div {...props}>{children}</div>
}))

vi.mock(
  '~/containers/student-home-page/student-popular-categories/StudentPopularCategories',
  () => ({
    __esModule: true,
    default: () => <div data-testid='student-popular-categories' />
  })
)

vi.mock('~/containers/student-home-page/faq/Faq', () => ({
  __esModule: true,
  default: () => <div data-testid='faq' />
}))

vi.mock('~/components/user-steps-wrapper/UserStepsWrapper', () => ({
  __esModule: true,
  default: ({ userRole }) => (
    <div data-testid='user-steps-wrapper'>{userRole}</div>
  )
}))

describe('StudentHome component', () => {
  const openModalMock = vi.fn()

  beforeEach(() => {
    useSelector.mockReturnValue({ isFirstLogin: true, userRole: 'student' })
    useModalContext.mockReturnValue({ openModal: openModalMock })
  })

  it('should render correctly', () => {
    render(<StudentHome />)

    expect(screen.getByTestId('studentHome')).toBeInTheDocument()
    expect(screen.getByTestId('student-popular-categories')).toBeInTheDocument()
    expect(screen.getByTestId('faq')).toBeInTheDocument()
  })

  it('should open modal with UserStepsWrapper on first login', async () => {
    render(<StudentHome />)

    await waitFor(() => {
      expect(openModalMock).toHaveBeenCalledWith({
        component: expect.objectContaining({ type: expect.any(Function) }),
        paperProps: {
          sx: {
            maxHeight: { sm: '652px' },
            height: '100%',
            maxWidth: '1130px',
            width: '100%'
          }
        }
      })
    })
  })
})
