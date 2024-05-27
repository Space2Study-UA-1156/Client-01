import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'

import { useModalContext } from '~/context/modal-context'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/results-not-found/ResultsNotFound.styles'
import Magnifier from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'

const ResultsNotFound = ({
  name = 'category',
  dialog = <p>default dialog</p>, // TODO
  sx = {}
}) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const handleOpenModal = () => {
    openModal({ component: dialog })
  }

  return (
    <Box component='section' sx={spliceSx(styles.root, sx.root)}>
      <Box sx={spliceSx(styles.box, sx.box)}>
        <ImgTitleDescription
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
