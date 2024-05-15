import { useState } from 'react'
import { Box, InputAdornment, Typography } from '@mui/material'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/categories-title-input/CategoriesTitleInput.styles'
import { useSearchParams } from 'react-router-dom'
import AppTextField from '~/components/app-text-field/AppTextField'
import useBreakpoints from '~/hooks/use-breakpoints'

const CategoriesTitleInput = () => {
  const { t } = useTranslation()
  const { isMobile = false } = useBreakpoints()
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()
  const [categoryName, setCategoryName] = useState('')

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
        const newParams = new URLSearchParams(params)
        newParams.set('categoryName', categoryName)
        return newParams
      })

      setCategoryName('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box>
      <Box sx={styles.root}>
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
          {!isMobile && (
            <AppTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <AppButton
                      data_testid='button-search'
                      onClick={handleSearch}
                      size='large'
                      sx={styles.buttonSearch}
                      variant='containedLight'
                    >
                      {t('common.search')}
                    </AppButton>
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
          )}
          {isMobile && (
            <AppTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <AppButton
                      data_testid='button-search'
                      onClick={handleSearch}
                      size='large'
                      sx={styles.buttonSearch}
                      variant='containedLight'
                    >
                      <SearchIcon />
                    </AppButton>
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
                {t('categoriesPage.category')}
              </Typography>{' '}
              {t('categoriesPage.or')}{' '}
              <Typography
                component='span'
                data-testid='footer'
                sx={styles.requestLink}
              >
                {t('categoriesPage.subject')}
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
