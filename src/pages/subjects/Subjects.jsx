import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'
import SubjectsSearch from '~/containers/subjects-search/SubjectsSearch'
import SubjectList from '~/containers/subject-list/SubjectList'

const Subjects = () => {
  return (
    <PageWrapper>
      <CreateRequestOffer />
      <SubjectsSearch />
      <SubjectList />
    </PageWrapper>
  )
}

export default Subjects
