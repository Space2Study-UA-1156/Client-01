import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { LocationService } from '~/services/location-service'
import SelectGroup from '~/containers/tutor-home-page/general-info-step/SelectGroup'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

vi.mock('~/services/location-service')

const theme = createTheme()

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>)
}

describe('SelectGroup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    renderWithTheme(<SelectGroup />)

    expect(
      await screen.findByLabelText('common.labels.country')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('common.labels.city')).toBeInTheDocument()
  })

  it('fetches and displays countries', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    renderWithTheme(<SelectGroup />)

    const countrySelect = await screen.findByLabelText('common.labels.country')
    userEvent.click(countrySelect)

    expect(await screen.findByText('USA')).toBeInTheDocument()
    expect(await screen.findByText('Canada')).toBeInTheDocument()
  })

  it('fetches and displays cities when a country is selected', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    LocationService.getCities.mockResolvedValueOnce({
      data: ['New York', 'Los Angeles']
    })

    renderWithTheme(<SelectGroup />)

    const countrySelect = await screen.findByLabelText('common.labels.country')
    userEvent.click(countrySelect)
    userEvent.click(await screen.findByText('USA'))

    expect(await screen.findByLabelText('common.labels.city')).toBeEnabled()

    const citySelect = screen.getByLabelText('common.labels.city')
    userEvent.click(citySelect)

    expect(await screen.findByText('New York')).toBeInTheDocument()
    expect(await screen.findByText('Los Angeles')).toBeInTheDocument()
  })

  it.skip('disables city select when no country is selected', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })

    renderWithTheme(<SelectGroup />)

    const citySelect = screen.getByLabelText('common.labels.city')
    expect(citySelect).toBeDisabled()
  })

  it.skip('clears city selection when country is changed', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    LocationService.getCities.mockResolvedValueOnce({
      data: ['New York', 'Los Angeles']
    })
    LocationService.getCities.mockResolvedValueOnce({
      data: ['Toronto', 'Vancouver']
    })

    renderWithTheme(<SelectGroup />)

    const countrySelect = await screen.findByLabelText('common.labels.country')
    userEvent.click(countrySelect)
    userEvent.click(await screen.findByText('USA'))

    const citySelect = screen.getByLabelText('common.labels.city')
    userEvent.click(citySelect)
    userEvent.click(await screen.findByText('New York'))

    expect(citySelect.value).toBe('New York')

    userEvent.click(countrySelect)
    userEvent.click(await screen.findByText('Canada'))

    expect(citySelect).toBeDisabled()
    expect(citySelect.value).toBe('')
  })
})
