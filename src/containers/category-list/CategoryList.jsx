import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import AppButton from '~/components/app-button/AppButton'
import CategoryCard from '~/components/category-card/CategoryCard'
import Loader from '~/components/loader/Loader'
import { styles } from '~/containers/category-list/CategoryList.styles'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'

// TODO: update path of category images in db and import images
import categoryImg from '~/assets/img/student-home-page/service_icon.png'

const itemsPerPage = 24

const CategoryList = () => {
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
    if (res?.count < itemsPerPage) {
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
    return (
      <Box component='section' sx={styles.root}>
        <Box>Sorry, no results found</Box>
      </Box>
    )
  }

  return (
    <Box component='section' sx={styles.root}>
      <Box sx={styles.grid}>
        {categories.map(({ _id, name, totalOffers }) => (
          <CategoryCard
            id={_id}
            img={categoryImg}
            key={_id}
            title={name}
            totalOffers={totalOffers.student + totalOffers.tutor}
          />
        ))}
      </Box>
      {isMore && (
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
