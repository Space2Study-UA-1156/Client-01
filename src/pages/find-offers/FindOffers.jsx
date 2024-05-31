import { useEffect, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import useBreakpoints from '~/hooks/use-breakpoints'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import PopularCategories from '~/containers/popular-categories/PopularCategories'
import OfferCardsContainer from '~/containers/offer-cards-container/OfferCardsContainer'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import SortMenu from '~/components/sort-menu/SortMenu'
import ExploreOffers from '~/containers/explore-offers/ExploreOffers'
import ResultsNotFound from '~/components/results-not-found/ResultsNotFound'
import Loader from '~/components/loader/Loader'
import CreateRequestOffer from '~/containers/create-request-offer/CreateRequestOffer'
import AppPagination from '~/components/app-pagination/AppPagination'
import { Box } from '@mui/material'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const { isMobile, isTablet } = useBreakpoints()
  const [offers, setOffers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)
  const [page, setPage] = useState(() => searchParams.get('page') || 1)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const offersPerPage = 3 //==============9

  const categoryId = searchParams.get('categoryId') || ''
  const subjectId = searchParams.get('subjectId') || ''
  const search = searchParams.get('search') || ''
  const [sort, setSort] = useState(() => searchParams.get('sort') || 'newest')

  const onResponse = useCallback((res) => {
    if (res?.items) {
      setOffers(res.items)
      setNumberOfPages(() => Math.ceil(res.count / offersPerPage))
    }
  }, [])

  const handlePageChange = (event, page) => {
    setPage(page)
  }

  const { fetchData, loading } = useAxios({
    service: categoryService.getOffers,
    fetchOnMount: false,
    defaultResponse: [],
    onResponse
  })

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests')
    }
  }

  const changeRole = () => {
    setRole(role === 'tutor' ? 'student' : 'tutor')
  }

  const fetchOffers = useCallback(() => {
    fetchData({
      categoryId: categoryId,
      subjectId: subjectId,
      search: search,
      sort: sort,
      authorRole: role,
      limit: offersPerPage,
      skip: (page - 1) * offersPerPage
    })
  }, [fetchData, categoryId, subjectId, search, sort, role, page])

  useEffect(() => {
    setSearchParams((params) => {
      params.set('view', view)
      params.set('role', role)
      params.set('page', page)
      params.set('categoryId', categoryId)
      params.set('subjectId', subjectId)
      params.set('search', search)
      params.set('sort', sort)
      return params
    })
  }, [view, categoryId, subjectId, search, sort, role, page, setSearchParams])

  //==================================
  useEffect(() => {
    setPage(1)
  }, [categoryId, subjectId, search, sort, role])
  //==================================

  useEffect(() => {
    fetchOffers()
  }, [fetchOffers, categoryId, subjectId, search, sort, role, page]) // add search params

  return (
    <PageWrapper>
      Find offers
      <Box sx={styles.rootFindOffers}>
        <Box sx={styles.tutorForPrivateLessons}>
          <CreateRequestOffer />
        </Box>
        <ExploreOffers />

        <Box sx={styles.filterSwitcherMenuViewContainer}>
          {!isMobile && !isTablet && (
            <AppViewSwitcher setView={setView} view={view} />
          )}
          {!isMobile && !isTablet && (
            <AppContentSwitcher
              active={role === userRole}
              onChange={changeRole}
              styles={styles.switch}
              switchOptions={switchOptions}
              typographyVariant={'h6'}
            />
          )}
          {!isMobile && <SortMenu setSort={setSort} sort={sort} />}
        </Box>

        {loading ? (
          <Loader pageLoad />
        ) : (
          <>
            {offers.length > 0 ? (
              <OfferCardsContainer offers={offers} view={view} />
            ) : (
              <ResultsNotFound />
            )}
          </>
        )}
        <AppPagination
          onChange={handlePageChange}
          page={Number(page)}
          pageCount={numberOfPages}
        />
        <PopularCategories />
      </Box>
    </PageWrapper>
  )
}
export default FindOffers
