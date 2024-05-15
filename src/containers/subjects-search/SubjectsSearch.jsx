import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'
import { Box, InputAdornment, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { styles } from '~/containers/subjects-search/SubjectsSearch.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'

const SubjectsSearch = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()
  const [subjectName, setSubjectName] = useState(
    ()=>(searchParams.get('subjectName') || '')
  )

  const categoryName = searchParams.get('categoryName')

  const handleCategoryChange = (_e, categoryValue) => {
    if (!categoryValue) {
      setSearchParams((params) => {
        params.delete('categoryId')
        params.delete('categoryName')
        return params
      })
      return
    }
    setSearchParams((params) => {
      params.set('categoryId', categoryValue._id)
      params.set('categoryName', categoryValue.name)
      return params
    })
  }

  const handleSubjectChange = (e) => {
    setSubjectName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subjectName) {
      setSearchParams((params) => {
        params.delete('subjectName')
        return params
      })
      return
    }

    setSearchParams((params) => {
      params.set('subjectName', subjectName)
      return params
    })
  }

  const categoryInput = (
    <AsyncAutocomplete
      labelField='name'
      onChange={handleCategoryChange}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        placeholder: t('subjectsPage.subjects.categoryLabel')
      }}
      value={searchParams.get('categoryId')}
      valueField='_id'
    />
  )

  const footer = (
    <Typography sx={styles.footer}>
      {t('subjectsPage.subjects.request')}{' '}
      <Typography component='span' sx={styles.requestLink}>
        {t('subjectsPage.subjects.category')}
      </Typography>{' '}
      {t('subjectsPage.subjects.or')}{' '}
      <Typography component='span' sx={styles.requestLink}>
        {t('subjectsPage.subjects.subject')}
      </Typography>
      !
    </Typography>
  )

  return (
    <Box component='section' sx={styles.root}>
      <TitleWithDescription
        description={t('subjectsPage.subjects.description')}
        style={styles.TitleWithDescription}
        title={t('subjectsPage.subjects.title', {
          category: categoryName || ''
        })}
      />
      <Box sx={styles.navigationContainer}>
        <AppButton
          component={Link}
          startIcon={<ArrowBackIcon />}
          sx={styles.navigationBtn}
          to={authRoutes.categories.path}
          variant='text'
        >
          {isMobile
            ? t('subjectsPage.subjects.backToAllCategoriesMobile')
            : t('subjectsPage.subjects.backToAllCategories')}
        </AppButton>
        <AppButton
          component={Link}
          endIcon={<ArrowForwardIcon />}
          sx={styles.navigationBtn}
          to={authRoutes.findOffers.path}
          variant='text'
        >
          {isMobile
            ? t('subjectsPage.subjects.showAllOffersMobile')
            : t('subjectsPage.subjects.showAllOffers')}
        </AppButton>
      </Box>
      <Box component='form' onSubmit={handleSubmit} sx={styles.searchContainer}>
        <Box sx={styles.inputContainer}>
          {!isMobile && categoryInput}
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon sx={{ color: 'primary.700' }} />
                </InputAdornment>
              )
            }}
            onChange={handleSubjectChange}
            placeholder={t('subjectsPage.subjects.subjectLabel')}
            sx={styles.subjectInput}
            value={subjectName}
          />
        </Box>
        {!isMobile && (
          <AppButton type='submit' variant='containedLight'>
            {t('common.search')}
          </AppButton>
        )}
      </Box>
      {isMobile && categoryInput}
      {!isMobile && footer}
    </Box>
  )
}

export default SubjectsSearch
