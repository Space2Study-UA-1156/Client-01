import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'
import CategoriesTitleInput from '~/containers/categories-title-input/CategoriesTitleInput'
import CategoryListWrapper from '~/containers/category-list-wrapper/CategoryListWrapper'

const Categories = () => {
  return (
    <PageWrapper>
      <CreateRequestOffer />
      <CategoriesTitleInput />
      <CategoryListWrapper />
    </PageWrapper>
  )
}

export default Categories
