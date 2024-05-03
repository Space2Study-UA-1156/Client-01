import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import subjectIcon from '~/assets/img/find-offers/subject_icon.svg'
import { styles } from '~/containers/find-offers/create-request-offer/CreateRequestOffer.styles'

const CreateRequestOffer = () => {
  const { t } = useTranslation()
  const { userRole } = useSelector((state) => state.appMain)
  const { isMobile } = useBreakpoints()

  return (
    <Box component='section' sx={styles.root}>
      <Box sx={styles.row}>
        <Box>
          <TitleWithDescription
            description={t(`findOffers.offerRequestBlock.description`)}
            style={styles.titleWithDescription}
            title={t(`findOffers.offerRequestBlock.title.${userRole}`)}
          />

          <AppButton sx={styles.button}>
            {t(`findOffers.offerRequestBlock.button.${userRole}`)}
          </AppButton>
        </Box>

        {!isMobile && <Box alt='subject' component='img' src={subjectIcon} />}
      </Box>
    </Box>
  )
}

export default CreateRequestOffer
