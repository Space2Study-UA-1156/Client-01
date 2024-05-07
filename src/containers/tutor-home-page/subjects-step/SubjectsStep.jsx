import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import useBreakpoints from '~/hooks/use-breakpoints'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import studyCategory from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { useStepContext } from '~/context/step-context'
import { useSelector } from 'react-redux'
import { student } from '~/constants'
import { interests, subjects } from '~/components/user-steps-wrapper/constants'

const SubjectsStep = ({ btnsBox }) => {
  const { userRole } = useSelector((state) => state.appMain)
  const { t } = useTranslation()
  const { isMobile, isLaptopAndAbove } = useBreakpoints()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const { stepData, handleStepData } = useStepContext()
  const subjectLabel = userRole === student ? interests : subjects
  const selectedSubjects = stepData[subjectLabel]
  const isCategorySelected = Boolean(category)
  const isSubjectSelected = !subject

  const handleChangeCategory = (e, categoryValue) => {
    setCategory(categoryValue)
    setSubject(null)
  }

  const handleChangeSubject = (e, subjectValue) => {
    setSubject(subjectValue)
  }

  const handleAddSubject = () => {
    if (!subject) return
    if (selectedSubjects.find((item) => item.name === subject.name)) {
      setSubject(null)
      return
    }

    handleStepData(subjectLabel, [...selectedSubjects, subject])
    setSubject(null)
  }

  const handleDeleteSubject = (subjectName) => {
    handleStepData(
      subjectLabel,
      selectedSubjects.filter((subject) => subject.name !== subjectName)
    )
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
            value={category?._id}
            valueField='_id'
          />

          <AsyncAutocomplete
            disabled={!isCategorySelected}
            fetchCondition={isCategorySelected}
            fetchOnFocus
            labelField='name'
            onChange={handleChangeSubject}
            service={() => subjectService.getSubjectsNames(category?._id)}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subject?._id}
            valueField='_id'
          />

          <AppButton
            disabled={isSubjectSelected}
            onClick={handleAddSubject}
            variant={'tonal'}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>

          <AppChipList
            defaultQuantity={2}
            handleChipDelete={handleDeleteSubject}
            items={selectedSubjects.map((subject) => subject.name)}
          />
        </Box>

        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
