import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import PopularCategories from '~/containers/popular-categories/PopularCategories'
import OfferCardsContainer from '~/containers/offer-cards-container/OfferCardsContainer'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { defaultResponses, student } from '~/constants'
import useAxios from '~/hooks/use-axios'
import { offerService } from '~/services/offer-service'
import SortMenu from '~/components/sort-menu/SortMenu'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const [offers, setOffers] = useState([])
  const [originalOffers, setOriginalOffers] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)
  const [sort, setSort] = useState(() => searchParams.get('sort') || 'newest')
  const offersPerPage = 9

  const onResponse = (res) => {
    if (res?.items) {
      setOriginalOffers(res.items)
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
    setRole((prevRole) => (prevRole === 'tutor' ? 'student' : 'tutor'))
  }

  useEffect(() => {
    fetchData({
      limit: offersPerPage
      // TODO: Use skip param to implement pagination
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const params = {
      view,
      role,
      sort
    }
    setSearchParams(params)
  }, [view, role, sort, setSearchParams])

  useEffect(() => {
    const authorRole = searchParams.get('role')

    const filteredOffers = originalOffers.filter((offer) => {
      if (authorRole && offer.authorRole !== authorRole) {
        return false
      }
      return true
    })

    const sortedOffers = filteredOffers.sort((a, b) => {
      switch (sort) {
        case 'newest': {
          return new Date(b.updatedAt) - new Date(a.updatedAt)
        }
        case 'priceAsc': {
          return a.price - b.price
        }
        case 'priceDesc': {
          return b.price - a.price
        }
        case 'rating': {
          const ratingA = a.author.averageRating[role] || 0
          const ratingB = b.author.averageRating[role] || 0
          return ratingB - ratingA
        }
        default:
          return 0
      }
    })

    setOffers(sortedOffers)
  }, [originalOffers, role, sort, searchParams])

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
