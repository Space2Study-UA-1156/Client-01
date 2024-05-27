import { Box, MenuItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Select from '@mui/material/Select'
import { styles } from '~/components/sort-menu/SortMenu.styles.js'
import AppButton from '~/components/app-button/AppButton'
import { useSearchParams } from 'react-router-dom'

const SortMenu = ({ sort, setSort }) => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  const handleChange = (event) => {
    const newValue = event.target.value
    setSort(newValue)
    setSearchParams({ ...searchParams, sort: newValue })
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.label}>{t('common.labels.sortBy')}</Box>
      <Box sx={styles.sortContainer}>
        <Select id='demo-simple-select' onChange={handleChange} value={sort}>
          <MenuItem value='newest'>
            <AppButton
              data_testid='button-newest'
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
