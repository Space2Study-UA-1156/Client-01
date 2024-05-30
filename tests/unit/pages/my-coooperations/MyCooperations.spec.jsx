import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MyCooperations from '~/pages/my-cooperations/MyCooperations'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}))

describe('MyCooperations component', () => {
  it('should render correctly', () => {
    render(<MyCooperations />)
    expect(screen.getByText('My cooperations')).toBeInTheDocument()
  })
})
