import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import appTypography from '~/styles/app-theme/app.typography'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/popular-categories/PopularCategories.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { defaultResponses } from '~/constants'
import { withLoader } from '~/hocs/withLoader'
import CategoryList from '~/containers/category-list/CategoryList'

const CategoryListWithLoader = withLoader(CategoryList)

const PopularCategories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [popularCategories, setPopularCategories] = useState([])

  const showAllCategories = () => {
    navigate(authRoutes.categories.path)
  }

  const onResponse = (res) => {
    if (res?.items) {
      setPopularCategories(() => res.items)
    }
  }

  const { fetchData, loading } = useAxios({
    service: categoryService.getCategories,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array,
    onResponse
  })

  useEffect(() => {
    fetchData({
      limit: 9,
      sort: 'totalOffersDesc'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box component='section' sx={styles.wrapper}>
      <Typography sx={appTypography.h4}>
        {t('common.popularCategories')}
      </Typography>

      <CategoryListWithLoader
        categories={popularCategories}
        isLoading={loading}
      />

      <AppButton onClick={showAllCategories} size='extraLarge' variant='tonal'>
        {t('categoriesPage.viewMore')}
      </AppButton>
    </Box>
  )
}
export default PopularCategories
