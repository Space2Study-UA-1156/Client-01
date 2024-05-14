import { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { useSearchParams } from 'react-router-dom'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import PopularCategories from '~/containers/popular-categories/PopularCategories'

const FindOffers = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [view, setView] = useState(() => searchParams.get('view') || 'list')

  useEffect(() => {
    setSearchParams({ view })
  }, [view, setSearchParams])

  return (
    <PageWrapper>
      Find offers
      <Stack>
        <AppViewSwitcher setView={setView} view={view} />
      </Stack>
      <PopularCategories />
    </PageWrapper>
  )
}

export default FindOffers
