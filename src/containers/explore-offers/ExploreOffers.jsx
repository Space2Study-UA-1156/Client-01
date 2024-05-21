import { useState } from 'react'
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
import CloseIcon from '@mui/icons-material/Close'
import useBreakpoints from '~/hooks/use-breakpoints'
import { authRoutes } from '~/router/constants/authRoutes'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const ExploreOffers = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isMobile, isTablet } = useBreakpoints()
  const [, setSearchParams] = useSearchParams()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState([])
  const [tutor, setTutor] = useState('')

  const returnToCategories = () => {
    navigate(authRoutes.categories.path)
  }

  const showAllOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  const handleChangeCategory = (_e, categoryValue) => {
    setCategory(categoryValue)

    setSearchParams((params) => {
      if (categoryValue) {
        params.set('categoryId', categoryValue._id)
      } else {
        params.delete('categoryId')
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
    setTutor(value)
  }

  const handleClose = () => {
    setTutor('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    const tutorParts = tutor.trim().split(' ')
    let firstName = ''
    let lastName = ''

    if (tutorParts.length === 1) {
      lastName = tutorParts[0]
    } else if (tutorParts.length >= 2) {
      firstName = tutorParts[0]
      lastName = tutorParts[tutorParts.length - 1]
    }

    setSearchParams((params) => {
      if (firstName) {
        params.set('tutorFirstName', firstName)
      } else {
        params.delete('tutorFirstName')
      }

      if (lastName) {
        params.set('tutorLastName', lastName)
      } else {
        params.delete('tutorLastName')
      }
      return params
    })
  }

  return (
    <Box component='section' sx={styles.root}>
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

      <Box sx={styles.searchContainer}>
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
            onChange={handleChangeTutor}
            onKeyDown={handleKeyPress}
            placeholder={t('findOffers.searchToolbar.label')}
            sx={styles.inputTutor}
            value={tutor}
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
