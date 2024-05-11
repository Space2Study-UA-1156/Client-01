import { useState } from 'react'
import { Box, Input, InputAdornment } from '@mui/material'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SearchIcon from '@mui/icons-material/Search'
// TODO: Add this import when block <CategoriesResultsNotFound /> will be on develop branch
//import CategoriesResultsNotFound from '~/containers/categories-results-not-found/CategoriesResultsNotFound'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { styles } from '~/containers/categories-title-input/CategoriesTitleInput.styles'
import { categoryService } from '~/services/category-service'
import useAxios from '~/hooks/use-axios'
import CategoryCard from '~/components/category-card/CategoryCard'
import categoryImg from '~/assets/img/student-home-page/service_icon.png'

const CategoriesTitleInput = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [categoryName, setCategoryName] = useState('')

  const { response, error, loading, fetchData } = useAxios({
    service: categoryService.getCategories,
    defaultResponse: null,
    fetchOnMount: false
  })

  const showAllOffers = () => {
    navigate(authRoutes.findOffers.path)
  }

  const handleChangeInput = (e) => {
    setCategoryName(e.target.value)
  }

  const handleSearch = () => {
    if (categoryName.trim() !== '') {
      fetchData({ name: categoryName, exactMatch: true })
      setCategoryName('')
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
          <Input
            disabled={false}
            endAdornment={
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
            }
            onChange={handleChangeInput}
            placeholder={t('categoriesPage.searchLabel')}
            size='lg'
            startAdornment={
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            }
            sx={styles.inputField}
            type='text'
            value={categoryName}
            variant='outlined'
          />
        </Box>

        <Box sx={{ color: 'primary.500' }}>
          {/* TODO: Add links  */}
          <TitleWithDescription description={t('categoriesPage.requestText')} />
        </Box>
      </Box>

      <Box>
        {!loading && response && response.items.length === 0 && (
          <Box>
            {/* TODO: Add block <CategoriesResultsNotFound /> when it will be on develop branch  */}
            <Box>CategoriesResultsNotFound</Box>
          </Box>
        )}

        {error && <p>Error: {error.message}</p>}

        {response && response.items.length > 0 && (
          <Box sx={styles.cardsContainer}>
            {response.items.map((item) => {
              return (
                <CategoryCard
                  id={item._id}
                  img={categoryImg}
                  key={item._id}
                  sx={styles.card}
                  title={item.name}
                  totalOffers={
                    item.totalOffers.student + item.totalOffers.tutor
                  }
                />
              )
            })}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default CategoriesTitleInput
