import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'
import CategoriesTitleInput from '~/containers/categories-title-input/CategoriesTitleInput'
import CategoryList from '~/containers/category-list/CategoryList'

const Categories = () => {
  return (
    <PageWrapper>
      <CreateRequestOffer />
      <CategoriesTitleInput />
      <CategoryList />
    </PageWrapper>
  )
}

export default Categories
