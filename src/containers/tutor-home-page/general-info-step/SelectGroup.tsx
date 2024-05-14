import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelectGroupStyles } from './SelectGroup.styles'
import { LocationService } from '~/services/location-service'
interface Country {
  name: string
}

interface City {
  name: string
}
const SelectGroup: React.FC = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await LocationService.getCountries()
        setCountries(response.data as Country[])
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
          setCities(response.data as City[])
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      }

      void fetchCities()
    }
  }, [selectedCountry])

  const handleCountryChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSelectedCountry(event.target.value)
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel>{t('common.labels.country')}</InputLabel>
        <Select label={t('labels.country')} onChange={handleCountryChange}>
          {countries.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>{t('common.labels.city')}</InputLabel>
        <Select label={t('labels.city')}>
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
