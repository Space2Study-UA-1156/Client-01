import { Box } from '@mui/material'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import CardList from '~/components/card-list/CardList'
import CategoryCard from '~/components/category-card/CategoryCard'
import CategoriesResultsNotFound from '~/containers/categories-results-not-found/CategoriesResultsNotFound'
import { styles } from '~/containers/category-list/CategoryList.styles'
import { withLoader } from '~/hocs/withLoader'
import useViewMore from '~/hooks/use-view-more'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'

const CardListWithLoader = withLoader(CardList)

const CATEGORY_NAME_SEARCH_PARAMS_KEY = 'categoryName'

const CategoryList = ({
  cardsPerPage = 24,
  showViewMore = true,
  gridStyles
}) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const categoryName = searchParams.get(CATEGORY_NAME_SEARCH_PARAMS_KEY)

  const serviceFunction = useCallback(
    (params) =>
      categoryService.getCategories({ ...params, name: categoryName }),
    [categoryName]
  )

  const { data, handleViewMore, isViewMoreVisable, error, loading } =
    useViewMore({
      service: serviceFunction,
      cardsPerPage
    })

  const categories = data.map(({ _id, name, appearance, totalOffers }) => (
    <CategoryCard
      color={appearance?.color}
      icon={appearance?.path}
      key={_id}
      title={name}
      to={`${authRoutes.subjects.path}?categoryId=${_id}`}
      totalOffers={totalOffers?.tutor + totalOffers?.student}
    />
  ))

  if (error || (!data.length && !loading)) {
    return (
      <Box sx={styles.notFoundContainer}>
        <CategoriesResultsNotFound />
      </Box>
    )
  }

  return (
    <Box>
      <CardListWithLoader
        cards={categories}
        isLoading={loading && !data.length}
        styles={{
          ...styles.cardList,
          grid: gridStyles || styles.cardList.grid
        }}
      />

      {showViewMore && isViewMoreVisable && (
        <AppButton
          loading={loading}
          onClick={handleViewMore}
          size='extraLarge'
          sx={styles.button}
          variant='tonal'
        >
          {t('categoriesPage.viewMore')}
        </AppButton>
      )}
    </Box>
  )
}

export default CategoryList
