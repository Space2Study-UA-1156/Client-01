import { useState } from 'react'
import { Box, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'
import { styles } from '~/components/sort-menu/SortMenu.styles.js'
import AppButton from '~/components/app-button/AppButton'
import { useSearchParams } from 'react-router-dom'

const SortMenu = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
  console.log('SearchParams 1:', searchParams)
  console.log('Value:', sort)

  const handleChange = (event) => {
    const newValue = event.target.value
    setSort(newValue)
    console.log('Value:', sort)
    setSearchParams({ ...searchParams, sort: newValue })
    console.log('Value:', sort)
    console.log('SearchParams 2:', searchParams)
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.label}>{t('common.labels.sortBy')}</Box>
      <Box sx={styles.sortContainer}>
        <Select
          id='demo-simple-select'
          labelId='demo-simple-select-label'
          onChange={handleChange}
          value={sort}
        >
          <MenuItem value='newest'>
            <AppButton
              data_testid='button-newest'
              //size='large'
              sx={styles.buttonSort}
              variant='text'
            >
              {t('findOffers.sortTitles.newest')}
            </AppButton>
          </MenuItem>

          <MenuItem value='rating'>
            <AppButton
              data_testid='button-rating'
              size='large'
              sx={styles.buttonSort}
              variant='text'
            >
              {t('findOffers.sortTitles.rating')}
            </AppButton>
          </MenuItem>

          <MenuItem value='priceAsc'>
            <AppButton
              data_testid='button-priceAsc'
              size='large'
              sx={styles.buttonSort}
              variant='text'
            >
              {t('findOffers.sortTitles.priceAsc')}
            </AppButton>
          </MenuItem>

          <MenuItem value='priceDesc'>
            <AppButton
              data_testid='button-priceDesc'
              size='large'
              sx={styles.buttonSort}
              variant='text'
            >
              {t('findOffers.sortTitles.priceDesc')}
            </AppButton>
          </MenuItem>
        </Select>
      </Box>
    </Box>
  )
}

export default SortMenu
