import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import CategoryList from '~/containers/category-list/CategoryList'
import { styles } from './StudentPopularCategories.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import { authRoutes } from '~/router/constants/authRoutes'

const StudentPopularCategories = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const goToCategories = () => {
    navigate(authRoutes.categories.path)
  }

  return (
    <Box component='section' sx={styles.root}>
      <TitleWithDescription
        description={t('studentHomePage.popularCategories.description')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.popularCategories.title')}
      />
      <CategoryList
        cardsPerPage={8}
        gridStyles={styles.grid}
        showViewMore={false}
      />
      <AppButton
        onClick={goToCategories}
        sx={styles.button}
        variant='contained'
      >
        {t('studentHomePage.popularCategories.viewMore')}
      </AppButton>
    </Box>
  )
}
export default StudentPopularCategories
