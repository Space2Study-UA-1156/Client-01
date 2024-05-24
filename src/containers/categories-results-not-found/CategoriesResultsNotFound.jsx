import { Box } from '@mui/material'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import Magnifier from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/categories-results-not-found/CategoriesResultsNotFound.styles'

const CategoriesResultsNotFound = () => {
  const { t } = useTranslation()

  const requestNewCategory = () => {}

  return (
    <Box sx={styles.banner}>
      <Box sx={styles.boxTitle}>
        <ImgTitleDescription
          alt='Magnifier'
          description={t('constant.tryAgainText', { name: 'category' })}
          img={Magnifier}
          style={styles}
          title={t('constant.resultsNotFound')}
        />
      </Box>

      <AppButton
        onClick={requestNewCategory}
        size={'large'}
        sx={styles.button}
        type='submit'
        variant='contained'
      >
        {t('constant.buttonRequest', { name: 'category' })}
      </AppButton>
    </Box>
  )
}

export default CategoriesResultsNotFound