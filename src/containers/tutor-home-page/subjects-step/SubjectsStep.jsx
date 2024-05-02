import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import useBreakpoints from '~/hooks/use-breakpoints'

import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()
  const [categoryId, setCategoryId] = useState(null)
  const [subject, setSubject] = useState(null)

  const isCategorySelected = Boolean(categoryId)

  const handleChangeCategory = (e, categoryValue) => {
    setCategoryId(categoryValue?._id ?? null)
    setSubject(null)
  }

  const handleChangeSubject = (e, subjectValue) => {
    setSubject(subjectValue)
  }

  const imageBox = (
    <Box sx={styles.imageBox}>
      <Box component='img' src={studyCategory} />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && imageBox}

      <Box sx={styles.rightBox}>
        <Box sx={styles.contentBox}>
          <Typography variant='body1'>
            {t('becomeTutor.categories.title')}
          </Typography>

          {isMobile && imageBox}

          <AsyncAutocomplete
            fetchOnFocus
            labelField='name'
            onChange={handleChangeCategory}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={categoryId}
            valueField='_id'
          />

          <AsyncAutocomplete
            disabled={!isCategorySelected}
            fetchCondition={isCategorySelected}
            fetchOnFocus
            labelField='name'
            onChange={handleChangeSubject}
            service={() => subjectService.getSubjectsNames(categoryId)}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subject?._id}
            valueField='_id'
          />
        </Box>

        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
