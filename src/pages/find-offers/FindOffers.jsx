/*import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import PopularCategories from '~/containers/popular-categories/PopularCategories'
import OfferCardsContainer from '~/containers/offer-cards-container/OfferCardsContainer'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { defaultResponses, student, tutor } from '~/constants'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import { offerService } from '~/services/offer-service'
import AppPagination from '~/components/app-pagination/AppPagination'
import Loader from '~/components/loader/Loader'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const [offers, setOffers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)
  const [page, setPage] = useState(() => searchParams.get('page') || 1)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const offersPerPage = 9

  const onResponse = (res) => {
    if (res?.items) {
      setOffers(() => res.items)
      setNumberOfPages(() => Math.ceil(res.count / offersPerPage))
    }
  }

  const handlePageChange = (event, page) => {
    setPage(page)
  }

  const { fetchData, loading } = useAxios({
    service: offerService.getOffers,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array,
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
    setRole(role === tutor ? student : tutor)
  }

  useEffect(() => {
    setSearchParams({ view, role, page })
  }, [view, role, page, setSearchParams])

  useEffect(() => {
    fetchData({
      limit: offersPerPage,
      skip: (page - 1) * offersPerPage
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <PageWrapper>
      Find offers
      <Stack>
        {!isMobile && <AppViewSwitcher setView={setView} view={view} />}
        <AppContentSwitcher
          active={role === student}
          onChange={changeRole}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={'h6'}
        />
      </Stack>
      {loading ? (
        <Loader pageLoad />
      ) : (
        <OfferCardsContainer offers={offers} view={view} />
      )}
      <AppPagination
        onChange={handlePageChange}
        page={Number(page)}
        pageCount={numberOfPages}
      />
      <PopularCategories />
    </PageWrapper>
  )
}

export default FindOffers */

//==========================================
import { useEffect, useState } from 'react'
//import { useTranslation } from 'react-i18next'
//import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
//import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import PopularCategories from '~/containers/popular-categories/PopularCategories'
import OfferCardsContainer from '~/containers/offer-cards-container/OfferCardsContainer'
//import { styles } from '~/pages/find-offers/FindOffers.styles'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import SortMenu from '~/components/sort-menu/SortMenu'
import ExploreOffers from '~/containers/explore-offers/ExploreOffers'
import ResultsNotFound from '~/components/results-not-found/ResultsNotFound'
import Loader from '~/components/loader/Loader'

const FindOffers = () => {
  //const { t } = useTranslation()
  const [offers, setOffers] = useState([])
  const [searchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')

  const categoryId = searchParams.get('categoryId') || ''
  const subjectId = searchParams.get('subjectId') || ''
  const search = searchParams.get('search') || ''
  const [sort, setSort] = useState(() => searchParams.get('sort') || 'newest')

  const onResponse = (res) => {
    console.log('API response:', res)
    if (res?.items) {
      setOffers(() => res.items)
    }
  }

  const { fetchData, loading } = useAxios({
    service: categoryService.getOffers,
    fetchOnMount: false,
    defaultResponse: defaultResponses.array,
    onResponse
  })

  useEffect(() => {
    console.log('Fetching data with params:', {
      categoryId,
      subjectId,
      search,
      sort
    })
    console.log('SubjectId, useEffect:', subjectId)
    fetchData(categoryId, subjectId, {
      search: search,
      sort: sort
    })
  }, [categoryId, subjectId, search, sort])

  /*const [loading, setLoading] = useState(false);

  const fetchOffers = async (categoryId, subjectId, search, sort) => {
    try {
      setLoading(true);
      console.log('Fetching offers with', categoryId, subjectId, search, sort)
      const response = await categoryService.getOffers(categoryId, subjectId, search, sort)
      console.log('Received offers response:', response.data.items)
      setLoading(false);
      return response.data.items;
    } catch (error) {
      console.error('Error fetching offers:', error)
      setLoading(false);
      return [];
    }
  }
  
  useEffect(() => {
    const categoryId = searchParams.get('categoryId') || '';
    const subjectId = searchParams.get('subjectId') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest' 

    const fetchData = async () => {
      const fetchedOffers = await fetchOffers(categoryId, subjectId, search, sort);
      
      setOffers(fetchedOffers);
    };

    fetchData();
  }, [searchParams]);*/

  return (
    <PageWrapper>
      Find offers
      <Stack>
        <AppViewSwitcher setView={setView} view={view} />

        <SortMenu setSort={setSort} sort={sort} />
      </Stack>
      <ExploreOffers />
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
      <PopularCategories />
    </PageWrapper>
  )
}

export default FindOffers
