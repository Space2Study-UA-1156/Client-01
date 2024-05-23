import { Box } from '@mui/material'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import AppButton from '~/components/app-button/AppButton'
import Magnifier from '~/assets/img/guest-home-page/howItWorksStudentSecond.svg'
import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/categories-results-not-found/CategoriesResultsNotFound.styles'

const CategoriesResultsNotFound = ({ name = 'category' }) => {
  const { t } = useTranslation()

  const requestNewCategory = () => {}

  return (
    <Box sx={styles.box}>
      <ImgTitleDescription
        alt='Magnifier'
        description={t('constant.tryAgainText', { name })}
        img={Magnifier}
        style={styles}
        title={t('constant.resultsNotFound')}
      />
      <AppButton
        onClick={requestNewCategory}
        size={'large'}
        sx={styles.button}
        type='submit'
        variant='contained'
      >
        {t('constant.buttonRequest', { name })}
      </AppButton>
    </Box>
  )
}

export default CategoriesResultsNotFound
