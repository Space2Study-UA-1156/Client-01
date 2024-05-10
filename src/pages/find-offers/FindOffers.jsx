import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Stack from '@mui/material/Stack'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import { useState } from 'react'

const FindOffers = () => {
  const [view, setView] = useState('list')

  return (
    <PageWrapper>
      Find offers
      <Stack>
        <AppViewSwitcher setView={setView} view={view} />
      </Stack>
    </PageWrapper>
  )
}

export default FindOffers
