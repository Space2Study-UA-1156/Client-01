import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useSelectGroupStyles } from './SelectGroup.styles'
import Box from '@mui/material/Box'

const SelectGroup: React.FC = () => {
  const { t } = useTranslation()
  const classes = useSelectGroupStyles()

  const [selectedCountry, setSelectedCountry] = useState<string>('USA')
  const [countries] = useState([
    { name: 'USA' },
    { name: 'Canada' },
    { name: 'United Kingdom' }
  ])

  const [selectedCity, setSelectedCity] = useState<string>('New York')
  const [cities] = useState([
    { name: 'New York' },
    { name: 'Toronto' },
    { name: 'London' }
  ])

  return (
    <Box
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
    </Box>
  )
}

export default SelectGroup
