import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import CardList from '~/components/card-list/CardList'
import AppButton from '~/components/app-button/AppButton'
import CategoryCard from '~/components/category-card/CategoryCard'
import ResultsNotFound from '~/components/results-not-found/ResultsNotFound'

import useViewMore from '~/hooks/use-view-more'
import { subjectService } from '~/services/subject-service'
import { styles } from '~/containers/subject-list/SubjectList.styles'
import { withLoader } from '~/hocs/withLoader'
import { authRoutes } from '~/router/constants/authRoutes'

const CATEGORY_ID_SEARCH_PARAMS_KEY = 'categoryId'
const SUBJECT_NAME_SEARCH_PARAMS_KEY = 'subjectName'

const SubjectList = ({ cardsPerPage = 24 }) => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get(CATEGORY_ID_SEARCH_PARAMS_KEY)
  const subjectName = searchParams.get(SUBJECT_NAME_SEARCH_PARAMS_KEY)

  const serviceFunction = useCallback(
    (params) =>
      subjectService.getSubjects({ ...params, name: subjectName }, categoryId),
    [categoryId, subjectName]
  )

  const { data, handleViewMore, isViewMoreVisable, error, loading } =
    useViewMore({
      service: serviceFunction,
      cardsPerPage
    })

  const subjects = data.map((subject) => (
    <CategoryCard
      color={subject.category?.appearance?.color}
      icon={subject.category?.appearance?.path}
      key={subject._id}
      title={subject.name}
      to={`${authRoutes.findOffers.path}?categoryId=${subject.category?._id}&subjectId=${subject._id}`}
      totalOffers={subject.totalOffers?.student + subject.totalOffers?.tutor}
    />
  ))

  if (error || (!data.length && !loading)) {
    return <ResultsNotFound name='subject' />
  }

  return (
    <Box>
      <CardListWithLoader cards={subjects} isLoading={loading} />

      {isViewMoreVisable && (
        <AppButton
          disabled={loading}
          onClick={handleViewMore}
          size='extraLarge'
          sx={styles.button}
          variant='tonal'
        >
          {t('subjectsPage.subjects.viewMore')}
        </AppButton>
      )}
    </Box>
  )
}

const CardListWithLoader = withLoader(CardList)

export default SubjectList
