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
import { useStepContext } from '~/context/step-context'
import { StepContextType } from './interfaces/ITextFieldGroup'

const SelectGroup: React.FC = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()
  const { stepData, handleStepData, stepLabels } =
    useStepContext() as StepContextType

  const [generalStepLabel] = stepLabels
  const selectedCountry = stepData[generalStepLabel].data.country
  const selectedCity = stepData[generalStepLabel].data.city

  const [countries, setCountries] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await LocationService.getCountries()
        setCountries(response.data)
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
          setCities(response.data)
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      }
      void fetchCities()
    } else {
      setCities([])
      handleStepData(generalStepLabel, { city: '' }, {})
    }
  }, [generalStepLabel, handleStepData, selectedCountry])

  const handleCountryChange = (event: SelectChangeEvent) => {
    handleStepData(generalStepLabel, { country: event.target.value }, {})
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    handleStepData(generalStepLabel, { city: event.target.value }, {})
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
          onChange={(e) => handleCountryChange(e)}
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
          onChange={(e) => handleCityChange(e)}
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
