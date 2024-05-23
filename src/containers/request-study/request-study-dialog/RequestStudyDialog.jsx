import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import RequestStudyForm from '~/containers/request-study/request-study-form/RequestStudyForm'

import requestStudyImg from '~/assets/img/request-study-dialog/request-study.svg'
import { styles } from '~/containers/request-study/request-study-dialog/RequestStudyDialog.styles'
import useBreakpoints from '~/hooks/use-breakpoints'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

const RequestStudyDialog = () => {
  const { t } = useTranslation()
  const { isLaptopAndAbove } = useBreakpoints()

  return (
    <Box sx={styles.root}>
      {isLaptopAndAbove && (
        <Box sx={styles.imgContainer}>
          <Box
            alt='request a new study'
            component='img'
            src={requestStudyImg}
            sx={styles.img}
          />
        </Box>
      )}

      <Box sx={styles.formContainer}>
        <TitleWithDescription
          description={t('categoriesPage.newSubject.description')}
          style={styles.titleWithDescription}
          title={t('categoriesPage.newSubject.title')}
        />

        <Box sx={styles.form}>
          <RequestStudyForm />
        </Box>
      </Box>
    </Box>
  )
}

export default RequestStudyDialog
