import { useState } from 'react'
import { Box, InputAdornment, Typography } from '@mui/material'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/categories-title-input/CategoriesTitleInput.styles'
import AppTextField from '~/components/app-text-field/AppTextField'
import useBreakpoints from '~/hooks/use-breakpoints'
import CloseIcon from '@mui/icons-material/Close'

const CategoriesTitleInput = () => {
  const { t } = useTranslation()
  const { isMobile = false } = useBreakpoints()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [categoryName, setCategoryName] = useState(
    () => searchParams.get('categoryName') || ''
  )

  const showAllOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  const handleChangeInput = (e) => {
    const value = e.target.value
    setCategoryName(value)
  }

  const handleSearch = () => {
    if (categoryName.trim() !== '') {
      setSearchParams((params) => {
        params.set('categoryName', categoryName)
        params.delete('page')
        return params
      })
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClose = () => {
    setCategoryName('')
    setSearchParams((params) => {
      params.delete('categoryName')
      return params
    })
  }

  return (
    <Box>
      <Box sx={styles.rootInput}>
        <Box sx={styles.title}>
          <TitleWithDescription
            description={t('categoriesPage.description')}
            style={styles.titleWithDescription}
            title={t('categoriesPage.title')}
          />
        </Box>

        <Box sx={styles.buttonShowAllContainer}>
          <AppButton
            data_testid='button-show-all'
            endIcon={<ArrowForwardIcon />}
            onClick={showAllOffers}
            size='large'
            sx={styles.buttonShowAllOffers}
            variant='text'
          >
            {t('categoriesPage.showAllOffers')}
          </AppButton>
        </Box>

        <Box sx={styles.inputContainer}>
          <AppTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <CloseIcon
                    data-testid='close-icon'
                    onClick={handleClose}
                    sx={{ cursor: 'pointer' }}
                  />
                </InputAdornment>
              )
            }}
            helperText={null}
            multiline={false}
            onChange={handleChangeInput}
            onKeyDown={handleKeyPress}
            placeholder={t('categoriesPage.searchLabel')}
            sx={styles.inputField}
            value={categoryName}
          />

          {!isMobile && (
            <AppButton
              data_testid='button-search'
              onClick={handleSearch}
              size='large'
              sx={styles.buttonSearch}
              variant='containedLight'
            >
              {t('common.search')}
            </AppButton>
          )}

          {isMobile && (
            <AppButton
              data_testid='button-search'
              onClick={handleSearch}
              size='large'
              sx={styles.buttonSearch}
              variant='containedLight'
            >
              <SearchIcon />
            </AppButton>
          )}
        </Box>

        {!isMobile && (
          <Box>
            <Typography data-testid='footer' sx={styles.footer}>
              {t('categoriesPage.request')}{' '}
              <Typography
                component='span'
                data-testid='footer'
                sx={styles.requestLink}
              >
                {t('categoriesPage.categoryLink')}
              </Typography>{' '}
              {t('categoriesPage.or')}{' '}
              <Typography
                component='span'
                data-testid='footer'
                sx={styles.requestLink}
              >
                {t('categoriesPage.subjectLink')}
              </Typography>
              !
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CategoriesTitleInput
