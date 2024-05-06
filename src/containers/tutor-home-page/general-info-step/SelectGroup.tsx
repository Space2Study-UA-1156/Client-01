import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelectGroupStyles } from './SelectGroup.styles'
import { LocationService } from '~/services/location-service'
import {
  City,
  Country
} from '~/containers/tutor-home-page/general-info-step/interfaces/ISelectGroup'

const SelectGroup: React.FC = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [countries, setCountries] = useState<Country[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('')

  useEffect(() => {
    LocationService.getCountries()
      .then((response) => {
        const countryData = (response.data as Country[]).map(
          (country: Country) => ({ name: country.name })
        )
        setCountries(countryData)
        if (countryData.length > 0) {
          setSelectedCountry(countryData[0].name)
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
          const citiesData: City[] = (response.data as string[]).map(
            (name: string) => ({
              name
            })
          )

          setCities(citiesData)
          if (citiesData.length > 0) {
            setSelectedCity(citiesData[0].name)
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
          label={t('common.labels.country')}
          onChange={(e) => setSelectedCountry(e.target.value)}
          value={selectedCountry}
        >
          {countries.map((country) => (
            <MenuItem key={country.name} value={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>{t('common.labels.city')}</InputLabel>
        <Select
          disabled={!cities.length}
          label={t('common.labels.city')}
          onChange={(e) => setSelectedCity(e.target.value)}
          value={selectedCity}
        >
          {cities.map((city) => (
            <MenuItem key={city.name} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectGroup
