import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import PopularCategories from '~/containers/popular-categories/PopularCategories'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import { student, tutor } from '~/constants'

const FindOffers = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')
  const [role, setRole] = useState(() => searchParams.get('role') || userRole)

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
    setSearchParams({ view, role })
  }, [view, role, setSearchParams])

  return (
    <PageWrapper>
      Find offers
      <Stack>
        <AppViewSwitcher setView={setView} view={view} />
        <AppContentSwitcher
          active={role === student}
          onChange={changeRole}
          styles={styles.switch}
          switchOptions={switchOptions}
          typographyVariant={'h6'}
        />
      </Stack>
      <PopularCategories />
    </PageWrapper>
  )
}

export default FindOffers
