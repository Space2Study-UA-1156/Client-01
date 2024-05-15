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
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await LocationService.getCountries()
        setCountries(response.data as string[])
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    void fetchCountries()
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      const fetchCities = async () => {
        try {
          const response = await LocationService.getCities(selectedCountry)
          setCities(response.data as string[])
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      }

      void fetchCities()
    } else {
      setCities([])
      setSelectedCity('')
    }
  }, [selectedCountry])

  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value)
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value)
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel>{t('common.labels.country')}</InputLabel>
        <Select
          label={t('labels.country')}
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
        <InputLabel>{t('common.labels.city')}</InputLabel>
        <Select
          disabled={!selectedCountry}
          label={t('labels.city')}
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
