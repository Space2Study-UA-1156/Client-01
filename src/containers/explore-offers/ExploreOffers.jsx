/*import { useState, useEffect } from 'react'
import { Box, Input, InputAdornment } from '@mui/material'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'

import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/explore-offers/ExploreOffers.styles'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { offerService } from '~/services/offer-service'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

const ExploreOffers = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { isMobile } = useBreakpoints()

  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)

  const returnToCategories = () => {
    navigate(authRoutes.categories.path)
  }

  const showAllOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  const handleSearch = () => {}

  const handleChangeCategory = (_e, categoryValue) => {
    console.log('Selected category:', categoryValue)
    setCategory(categoryValue)
    console.log('Set category:', categoryValue)
    setSubject(null)

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
      console.log('Subject1:', subject)
      return params
    })
  
  }

  const handleChangeSubject = (_e, subjectValue) => {
    console.log('Category:', subject)
    console.log('Selected subject:', subjectValue)
    setTutor(null)
    if (!subjectValue) {
      setSearchParams((params) => {
        params.delete('subjectName')
        return params
      })
      setSubject(null)
      console.log('Set subject:', subjectValue)
      return
    }
    setSubject(subjectValue?.name)
  }

  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!subject) return

    setSearchParams((params) => {
      params.set('subjectName', subject)
      return params
    })
  }

  const categoryChoice = (
    <AsyncAutocomplete
      labelField='name'
      onChange={handleChangeCategory}
      service={categoryService.getCategoriesNames}
      sx={styles.categoryInput}
      textFieldProps={{
        placeholder: t('offerPage.createOffer.labels.category')
      }}
      value={category?._id}
      valueField='_id'
    />
  )

  const subjectChoice = (
    <AsyncAutocomplete
     
      labelField='name'
      onChange={handleChangeSubject}
      service={() => subjectService.getSubjectsNames(category?._id)}
      sx={styles.categoryInput}
      textFieldProps={{
        placeholder: t('offerPage.createOffer.labels.subject')
      }}
      value={subject?._id}
      valueField='_id'
    />
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.title}>
        <TitleWithDescription
          description={t('findOffers.titleWithDescription.description')}
          style={styles.titleWithDescription}
          title={t('findOffers.titleWithDescription.title')}
        />
      </Box>

      <Box sx={styles.buttonReturnToCategoriesContainer}>
        <AppButton
          data_testid='button-return'
          startIcon={<ArrowBackIcon />}
          onClick={returnToCategories}
          size='large'
          sx={styles.buttonReturnToCategories}
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
          sx={styles.buttonReturnToCategories}
          variant='text'
        >
          {t('subjectsPage.subjects.showAllOffers')}
        </AppButton>
        )}

      </Box>

      <Box component='form' onSubmit={handleSubmit} sx={styles.searchContainer}>
        <Box sx={styles.inputContainer}>
          <Box sx={styles.inputCategory}>
            {categoryChoice}
          </Box>

          <Box sx={styles.inputCategory}>
            {subjectChoice}
          </Box>

          <Input
            disabled={false}
            placeholder={t('findOffers.searchToolbar.label')}
            size='lg'
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
            sx={styles.inputField}
            type='text'
            variant='outlined'
             
          />
        
        </Box>

        <AppButton
          data_testid='button-search'
          onClick={handleSearch}
          sx={styles.buttonSearch}
          variant='containedLight'
        >
          {t('common.search')}
        </AppButton>
      </Box>
      
    </Box>
  )
}

export default ExploreOffers  */

//=============================================================
import { useState } from 'react'
import useAxios from '~/hooks/use-axios'
import { Box, CircularProgress } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import { offerService } from '~/services/offer-service'

const ExploreOffers = () => {
  const [loading, setLoading] = useState(false)
  const [responseData, setResponseData] = useState([])
  const [error, setError] = useState(null)

  const { fetchData } = useAxios({
    service: offerService.getOffers,
    defaultResponse: null,
    fetchOnMount: false
  })

  const handleButtonClick = async () => {
    try {
      setLoading(true)
      console.log('Fetching data...')

      const response = await fetchData({})
      console.log(fetchData)
      console.log('Response data:', response)

      if (response && response.data && response.data.items) {
        const transformedData = response.data.items.map((item) => ({
          _id: item._id,
          title: item.title,
          authorRole: item.authorRole,
          authorLastName: item.author.lastName
        }))
        setResponseData(transformedData)
      } else {
        throw new Error('Empty response data')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <AppButton disabled={loading} onClick={handleButtonClick}>
        Try!
      </AppButton>

      {loading && <CircularProgress />}
      {error && <Box color='error.main'>Error: {error}</Box>}
      {responseData && (
        <Box mt={2}>
          {responseData.map((item) => (
            <div key={item._id}>
              <p>ID: {item._id}</p>
              <p>Title: {item.title}</p>
              <p>Author Role: {item.authorRole}</p>
              <p>Author Last Name: {item.authorLastName}</p>
            </div>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ExploreOffers

//==============================================================
