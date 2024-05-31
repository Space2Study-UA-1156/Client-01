import { Box } from '@mui/material'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/category-list-wrapper/CategoryListWrapper.styles'
import useViewMore from '~/hooks/use-view-more'
import { categoryService } from '~/services/category-service'
import ResultsNotFound from '~/components/results-not-found/ResultsNotFound'
import CategoryList from '~/containers/category-list/CategoryList'
import { withLoader } from '~/hocs/withLoader'

const CategoryListWithLoader = withLoader(CategoryList)

const CATEGORY_NAME_SEARCH_PARAMS_KEY = 'categoryName'

const CategoryListWrapper = ({
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

  if (error || (!data.length && !loading)) {
    return <ResultsNotFound />
  }

  return (
    <Box>
      <CategoryListWithLoader
        categories={data}
        gridStyles={gridStyles}
        isLoading={loading && !data.length}
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

export default CategoryListWrapper
