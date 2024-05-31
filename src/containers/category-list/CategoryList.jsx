import { styles } from '~/containers/category-list/CategoryList.styles'
import CategoryCard from '~/components/category-card/CategoryCard'
import { authRoutes } from '~/router/constants/authRoutes'
import CardList from '~/components/card-list/CardList'

const CategoryList = ({ categories, gridStyles }) => {
  const categoryCards = categories.map(
    ({ _id, name, appearance, totalOffers }) => (
      <CategoryCard
        color={appearance?.color}
        icon={appearance?.path}
        key={_id}
        title={name}
        to={`${authRoutes.subjects.path}?categoryId=${_id}`}
        totalOffers={totalOffers?.tutor + totalOffers?.student}
      />
    )
  )

  return (
    <CardList
      cards={categoryCards}
      styles={{
        ...styles.cardList,
        grid: gridStyles || styles.cardList.grid
      }}
    />
  )
}
export default CategoryList
