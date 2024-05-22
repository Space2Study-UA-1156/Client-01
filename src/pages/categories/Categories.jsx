import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'
import CategoriesTitleInput from '~/containers/categories-title-input/CategoriesTitleInput'
import CategoryList from '~/containers/category-list/CategoryList'
import Box from '@mui/material/Box'
import { useSearchParams } from 'react-router-dom'
import { styles } from '~/pages/categories/Categories.styles'

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryName = searchParams.get('categoryName') || ''

  return (
    <PageWrapper>
      <Box sx={styles.root}>
        <CreateRequestOffer />
        <CategoriesTitleInput setSearchParams={setSearchParams} />
        <CategoryList categoryName={categoryName} />
      </Box>
    </PageWrapper>
  )
}

export default Categories
