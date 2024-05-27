import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import CategoryCard from '~/components/category-card/CategoryCard'
import Loader from '~/components/loader/Loader'
import { styles } from '~/containers/category-list/CategoryList.styles'
import useAxios from '~/hooks/use-axios'
import { authRoutes } from '~/router/constants/authRoutes'
import { categoryService } from '~/services/category-service'
import ResultsNotFound from '~/components/results-not-found/ResultsNotFound'

const CategoryList = ({ limit, gridStyles }) => {
  const itemsPerPage = limit || 24
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [isMore, setIsMore] = useState(true)

  const categoryName = searchParams.get('categoryName')

  const onResponse = (res) => {
    if (res?.items) {
      setCategories([...categories, ...res.items])
    }
    if (res?.count <= itemsPerPage * page) {
      setIsMore(false)
    }
  }

  const { loading, fetchData } = useAxios({
    service: categoryService.getCategories,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse
  })

  useEffect(() => {
    setPage(1)
    setCategories([])
  }, [categoryName])

  useEffect(() => {
    fetchData({
      name: categoryName,
      limit: itemsPerPage,
      skip: (page - 1) * itemsPerPage
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, categoryName])

  const handleViewMoreClick = () => {
    setPage(page + 1)
  }

  if (loading && !categories.length) {
    return (
      <Box component='section' sx={styles.root}>
        <Loader size={50} />
      </Box>
    )
  }

  if (!loading && !categories.length) {
    return <ResultsNotFound />
  }

  return (
    <Box component='section' sx={styles.root}>
      <Box sx={gridStyles || styles.grid}>
        {categories.map(({ _id, name, appearance, totalOffers }) => (
          <CategoryCard
            color={appearance?.color}
            icon={appearance?.path}
            key={_id}
            title={name}
            to={`${authRoutes.subjects.path}/categoryName=${name}`}
            totalOffers={totalOffers.tutor}
          />
        ))}
      </Box>
      {isMore && !limit && (
        <AppButton
          loading={loading}
          onClick={handleViewMoreClick}
          sx={styles.button}
          variant='contained'
        >
          {t('categoriesPage.viewMore')}
        </AppButton>
      )}
    </Box>
  )
}

export default CategoryList
