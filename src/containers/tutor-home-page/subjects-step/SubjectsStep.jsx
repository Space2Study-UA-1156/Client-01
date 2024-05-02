import { useTranslation } from 'react-i18next'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Box>
        <Box component='img' src={studyCategory} />
      </Box>

      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography>{t('becomeTutor.categories.title')}</Typography>

          <AsyncAutocomplete
            fetchOnFocus
            labelField='name'
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
          />

          <AsyncAutocomplete
            fetchOnFocus
            labelField='name'
            service={subjectService.getSubjectsNames}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
          />
        </Box>

        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
