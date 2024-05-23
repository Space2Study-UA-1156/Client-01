import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import RequestStudyDialog from '~/containers/request-study/request-study-dialog/RequestStudyDialog'

import Magnifier from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'
import { useModalContext } from '~/context/modal-context'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/results-not-found/ResultsNotFound.styles'

const ResultsNotFound = ({ name = 'category', sx = {} }) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const handleOpenModal = () => {
    openModal({ component: <RequestStudyDialog /> })
  }

  return (
    <Box component='section' sx={spliceSx(styles.root, sx.root)}>
      <Box sx={spliceSx(styles.box, sx.box)}>
        <ImgTitleDescription
          alt='Magnifier'
          description={t('constant.tryAgainText', { name })}
          img={Magnifier}
          style={styles.content}
          title={t('constant.resultsNotFound')}
        />
        <AppButton onClick={handleOpenModal} sx={styles.button} variant='tonal'>
          {t('constant.buttonRequest', { name })}
        </AppButton>
      </Box>
    </Box>
  )
}

export default ResultsNotFound
