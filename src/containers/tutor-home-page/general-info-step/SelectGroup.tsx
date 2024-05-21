import React, { useEffect, useState } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelectGroupStyles } from './SelectGroup.styles'
import { LocationService } from '~/services/location-service'

const SelectGroup: React.FC = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()
  const [countries, setCountries] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState(
    localStorage.getItem('selectedCountry') || ''
  )
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem('selectedCity') || ''
  )

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await LocationService.getCountries()
        const countryData = response.data
        setCountries(countryData)

        if (selectedCountry && !countryData.includes(selectedCountry)) {
          setSelectedCountry('')
          localStorage.removeItem('selectedCountry')
        }
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    void fetchCountries()
  }, [selectedCountry])

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry) {
        try {
          const response = await LocationService.getCities(selectedCountry)
          const cityData = response.data
          setCities(cityData)

          if (selectedCity && !cityData.includes(selectedCity)) {
            setSelectedCity('')
            localStorage.removeItem('selectedCity')
          }
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      } else {
        setCities([])
        setSelectedCity('')
      }
    }

    void fetchCities()
  }, [selectedCountry, selectedCity])

  useEffect(() => {
    localStorage.setItem('selectedCountry', selectedCountry)
  }, [selectedCountry])

  useEffect(() => {
    localStorage.setItem('selectedCity', selectedCity)
  }, [selectedCity])

  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value)
    setSelectedCity('') // Reset city when country changes
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value)
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel id='country-label'>{t('common.labels.country')}</InputLabel>
        <Select
          label={t('common.labels.country')}
          labelId='country-label'
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id='city-label'>{t('common.labels.city')}</InputLabel>
        <Select
          disabled={!selectedCountry}
          label={t('common.labels.city')}
          labelId='city-label'
          onChange={handleCityChange}
          value={selectedCity}
        >
          {cities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectGroup
