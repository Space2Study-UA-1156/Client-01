import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'

import Box from '@mui/material/Box'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppDrawer from '~/components/app-drawer/AppDrawer'

import subjectIcon from '~/assets/img/create-request-offer/subject_icon.svg'
import { styles } from '~/containers/create-request-offer/CreateRequestOffer.styles'

const CreateRequestOffer = () => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()
  const { isOpen, openDrawer, closeDrawer } = useDrawer()

  const handleOpen = () => {
    openDrawer()
  }

  return (
    <Box component='section' sx={styles.root}>
      <Box sx={styles.row}>
        <Box>
          <TitleWithDescription
            description={t(`findOffers.offerRequestBlock.description`)}
            style={styles.titleWithDescription}
            title={t(`findOffers.offerRequestBlock.title.${userRole}`)}
          />

          <AppButton onClick={handleOpen} sx={styles.button}>
            {t(`findOffers.offerRequestBlock.button.${userRole}`)}
          </AppButton>
        </Box>

        {!isMobile && <Box alt='subject' component='img' src={subjectIcon} />}
      </Box>

      <AppDrawer onClose={closeDrawer} open={isOpen}>
        {/* TODO: add a new request/offer form */}
      </AppDrawer>
    </Box>
  )
}

export default CreateRequestOffer
