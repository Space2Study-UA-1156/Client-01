import { ThemeProvider, createTheme } from '@mui/material/styles'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { studentStepLabels } from '~/components/user-steps-wrapper/constants'
import SelectGroup from '~/containers/tutor-home-page/general-info-step/SelectGroup'
import { useStepContext } from '~/context/step-context'
import { LocationService } from '~/services/location-service'
import { renderWithProviders } from '~tests/test-utils'

const mockStepData = {
  data: {
    firstName: '',
    lastName: '',
    city: '',
    country: '',
    professionalSummary: ''
  },
  errors: {
    firstName: '',
    lastName: '',
    professionalSummary: ''
  }
}
const mockHandleStepData = vi.fn()

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

vi.mock('~/context/step-context', async (importOriginal) => {
  const module = await importOriginal()

  return {
    ...module,
    useStepContext: vi.fn()
  }
})

vi.mock('~/services/location-service')

const theme = createTheme()

const renderWithTheme = (component) => {
  return renderWithProviders(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  )
}

const renderComponentWithStepContext = (data = mockStepData) => {
  useStepContext.mockReturnValue({
    stepData: { [studentStepLabels[0]]: data },
    stepLabels: studentStepLabels,
    handleStepData: mockHandleStepData
  })
  renderWithTheme(<SelectGroup />)
}

describe('SelectGroup Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    renderComponentWithStepContext()

    expect(
      await screen.findByLabelText('common.labels.country')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('common.labels.city')).toBeInTheDocument()
  })

  it.skip('fetches and displays countries', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    renderComponentWithStepContext()

    const countrySelect = await screen.findByLabelText('common.labels.country')
    userEvent.click(countrySelect)

    expect(await screen.findByText('USA')).toBeInTheDocument()
    expect(await screen.findByText('Canada')).toBeInTheDocument()
  })

  it.skip('fetches and displays cities when a country is selected', async () => {
    LocationService.getCountries.mockResolvedValueOnce({
      data: ['USA', 'Canada']
    })
    LocationService.getCities.mockResolvedValueOnce({
      data: ['New York', 'Los Angeles']
    })
    const mockData = {
      data: {
        firstName: '',
        lastName: '',
        city: 'testCity',
        country: 'testCountry',
        professionalSummary: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        professionalSummary: ''
      }
    }

    renderComponentWithStepContext(mockData)

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

    renderComponentWithStepContext()

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

    renderComponentWithStepContext()

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
