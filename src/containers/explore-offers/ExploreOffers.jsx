import { useState, useEffect } from 'react'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, InputAdornment } from '@mui/material'
import { styles } from '~/containers/explore-offers/ExploreOffers.styles.js'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import SearchIcon from '@mui/icons-material/Search'
import useBreakpoints from '~/hooks/use-breakpoints'
import { authRoutes } from '~/router/constants/authRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const ExploreOffers = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoints()
  const [searchParams, setSearchParams] = useSearchParams()

  const [category, setCategory] = useState(() => {
    const categoryId = searchParams.get('categoryId')
    return categoryId ? { _id: categoryId, name: '' } : ''
  })
  const [subject, setSubject] = useState(() => {
    const subjectId = searchParams.get('subjectId')
    return subjectId ? { _id: subjectId, name: '' } : ''
  })
  const [search, setSearch] = useState(() => {
    const search = searchParams.get('search') || ''
    return search ? `${search}`.trim() : ''
  })

  const returnToCategories = () => {
    navigate(authRoutes.categories.path)
  }

  const showAllOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  const handleChangeCategory = (_e, categoryValue) => {
    setCategory(categoryValue)
    setSubject('')
    setSearchParams((params) => {
      if (categoryValue) {
        params.set('categoryId', categoryValue._id)
        params.delete('subjectId')
      } else {
        params.delete('categoryId')
        params.delete('subjectId')
      }
      return params
    })
  }

  const handleChangeSubject = (_e, subjectValue) => {
    setSubject(subjectValue)
    setSearchParams((params) => {
      if (subjectValue) {
        params.set('subjectId', subjectValue._id)
      } else {
        params.delete('subjectId')
      }
      return params
    })
  }

  const handleChangeTutor = (e) => {
    const value = e.target.value
    setSearch(value)
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  useEffect(() => {
    const searchParamsString = searchParams.toString()

    if (isMobile || isTablet) {
      setSearch('')
      const params = new URLSearchParams(searchParamsString)
      params.delete('search')
      setSearchParams(params)
    }
  }, [isMobile, isTablet, setSearchParams, searchParams])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <Box component='section' sx={styles.rootInput}>
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />

      <Box sx={styles.buttonsNavigationContainer}>
        <AppButton
          data_testid='button-return'
          onClick={returnToCategories}
          size='large'
          startIcon={<ArrowBackIcon />}
          sx={styles.buttonsNavigation}
          variant='text'
        >
          {t('subjectsPage.subjects.backToAllCategories')}
        </AppButton>

        {isMobile && (
          <AppButton
            data_testid='button-show-all'
            endIcon={<ArrowForwardIcon />}
            onClick={showAllOffers}
            size='large'
            sx={styles.buttonsNavigation}
            variant='text'
          >
            {t('subjectsPage.subjects.showAllOffers')}
          </AppButton>
        )}
      </Box>

      <Box component='form' sx={styles.searchContainer}>
        <AsyncAutocomplete
          labelField='name'
          onChange={handleChangeCategory}
          service={categoryService.getCategoriesNames}
          sx={styles.autocompleteInput}
          textFieldProps={{
            placeholder: t('offerPage.createOffer.labels.category')
          }}
          value={category?._id || null}
          valueField='_id'
        />

        <AsyncAutocomplete
          labelField='name'
          onChange={handleChangeSubject}
          service={() => subjectService.getSubjectsNames(category?._id)}
          sx={styles.autocompleteInput}
          textFieldProps={{
            placeholder: t('offerPage.createOffer.labels.subject')
          }}
          value={subject?._id || ''}
          valueField='_id'
        />

        {!isMobile && !isTablet && (
          <AppTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            helperText={null}
            multiline={false}
            onChange={handleChangeTutor}
            onKeyDown={handleKeyPress}
            placeholder={t('findOffers.searchToolbar.label')}
            sx={styles.inputTutor}
            value={search}
          />
        )}

        {!isMobile && !isTablet && (
          <AppButton
            data_testid='button-search'
            onClick={handleSearch}
            sx={styles.buttonSearch}
            variant='containedLight'
          >
            {t('common.search')}
          </AppButton>
        )}
      </Box>
    </Box>
  )
}

export default ExploreOffers
