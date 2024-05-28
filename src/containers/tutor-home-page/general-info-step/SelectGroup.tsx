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
import { userService } from '~/services/user-service'
import { useSelector } from 'react-redux'
import { RootState } from '~/containers/tutor-home-page/general-info-step/interfaces/store'

const SelectGroup: React.FC = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()
  const { stepData, handleStepData, stepLabels, generalData, setGeneralData } =
    useStepContext() as StepContextType
  const userId = useSelector((state: RootState) => state.appMain.userId)

  const [generalStepLabel] = stepLabels
  const selectedCountry = stepData[generalStepLabel]?.data?.country || ''
  const selectedCity = stepData[generalStepLabel]?.data?.city || ''
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
    }
  }, [selectedCountry])

  const handleCountryChange = (event: SelectChangeEvent) => {
    const newCountry = event.target.value
    handleStepData(generalStepLabel, { country: newCountry, city: '' }, {})
    setGeneralData({
      data: {
        ...generalData.data,
        country: newCountry,
        city: ''
      },
      errors: generalData.errors
    })
    setCities([])
    void updateUserCountry(newCountry)
  }

  const handleCityChange = (event: SelectChangeEvent) => {
    const newCity = event.target.value
    handleStepData(generalStepLabel, { city: newCity }, {})
    setGeneralData({
      data: {
        ...generalData.data,
        city: newCity
      },
      errors: generalData.errors
    })
    void updateUserCity(newCity)
  }

  const updateUserCountry = async (newCountry: string) => {
    try {
      await userService.updateUser(userId, {
        address: { country: newCountry, city: '' }
      })
    } catch (error) {
      console.error('Error updating user country:', error)
    }
  }

  const updateUserCity = async (newCity: string) => {
    try {
      await userService.updateUser(userId, {
        address: { country: selectedCountry, city: newCity }
      })
    } catch (error) {
      console.error('Error updating user city:', error)
    }
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
