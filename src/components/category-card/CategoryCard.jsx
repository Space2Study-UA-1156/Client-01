import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppCard from '~/components/app-card/AppCard'
import { styles } from '~/components/category-card/CategoryCard.styles'
import { getCategoryIcon } from '~/services/category-icon-service'
import TitleWithDescription from '../title-with-description/TitleWithDescription'

const CategoryCard = ({ to, title, icon, color, totalOffers }) => {
  const { t } = useTranslation()

  const Icon = getCategoryIcon(icon)

  return (
    <AppCard link sx={styles.card} to={to}>
      <Box
        sx={{
          ...styles.iconContainer,
          backgroundColor: `#${color?.slice(1)}33`
        }}
      >
        <Icon sx={{ ...styles.icon, color }} />
      </Box>
      <TitleWithDescription
        description={t('categoriesPage.totalOffers', {
          totalOffers
        })}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CategoryCard
