import AppCard from '~/components/app-card/AppCard'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { styles } from '~/components/category-card/CategoryCard.styles'
import { useTranslation } from 'react-i18next'
import { authRoutes } from '~/router/constants/authRoutes'

const CategoryCard = ({ id, title, img, totalOffers }) => {
  const { t } = useTranslation()

  return (
    <AppCard link sx={styles.card} to={`${authRoutes.subjects.path}/${id}`}>
      <ImgTitleDescription
        description={`${totalOffers} ${t('categoriesPage.offers')}`}
        img={img}
        style={styles.imgTitleDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CategoryCard
