import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelectGroupStyles } from './SelectGroup.styles'
import { LocationService } from '~/services/location-service'

const SelectGroup = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    LocationService.getCountries()
      .then((response) => {
        const countryNames = response.data
        setCountries(countryNames)
        if (countryNames.length > 0) {
          setSelectedCountry(countryNames[0])
        } else {
          setSelectedCountry('')
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      LocationService.getCities(selectedCountry)
        .then((response) => {
          const cityNames = response.data
          setCities(cityNames)
          if (cityNames.length > 0) {
            setSelectedCity(cityNames[0])
          } else {
            setSelectedCity('')
          }
        })
        .catch((error) => {
          console.error('Error fetching cities:', error)
        })
    }
  }, [selectedCountry])

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel>{t('common.labels.country')}</InputLabel>
        <Select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          label={t('common.labels.country')}
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
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          label={t('common.labels.city')}
          disabled={!cities.length}
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
