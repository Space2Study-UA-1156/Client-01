import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import MyOffers from '~/pages/my-offers/MyOffers'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}))

describe('MyOffers component', () => {
  it('should render correctly', () => {
    render(<MyOffers />)
    expect(screen.getByText('My offers')).toBeInTheDocument()
  })
})
