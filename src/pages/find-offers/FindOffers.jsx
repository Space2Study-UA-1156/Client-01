import { useEffect, useState } from 'react'
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
import { offerService } from '~/services/offer-service'
import SortMenu from '~/components/sort-menu/SortMenu'
import { Box } from '@mui/material'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const [offers, setOffers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)
  const [sort, setSort] = useState(() => searchParams.get('sort') || 'newest')
  const offersPerPage = 9

  const onResponse = (res) => {
    if (res?.items) {
      setOffers((prevState) => prevState.concat(res.items))
    }
    // TODO: Check res.count to implement pagination in the future
  }

  const { fetchData } = useAxios({
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
    setSearchParams({ view, role, sort })
  }, [view, role, sort, setSearchParams])

  useEffect(() => {
    fetchData({
      limit: offersPerPage
      // TODO: Use skip param to implement pagination
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PageWrapper>
      Find offers
      <Box sx={styles.rootFindOffers}>
        <Stack sx={styles.filterSwitcherMenuViewContainer}>
          <AppContentSwitcher
            active={role === student}
            onChange={changeRole}
            styles={styles.switch}
            switchOptions={switchOptions}
            typographyVariant={'h6'}
          />
          <SortMenu setSort={setSort} sort={sort} />
          <AppViewSwitcher setView={setView} view={view} />
        </Stack>
        <OfferCardsContainer offers={offers} view={view} />
        <PopularCategories />
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
