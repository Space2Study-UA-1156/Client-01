import React, { useEffect, useState } from 'react'
import CloseRounded from '@mui/icons-material/CloseRounded'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/app-drawer/AppDrawer.styles'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { languageService } from '~/services/language-service'
import { AxiosResponse } from 'axios'

interface AppDrawerProps {
  anchor?: 'left' | 'right' | 'top' | 'bottom'
  children?: React.ReactNode
  closeIcon?: boolean
  onClose: () => void

  [x: string]: any
}

const AppDrawer: React.FC<AppDrawerProps> = ({
  anchor = 'right',
  children,
  closeIcon = true,
  onClose,
  ...props
}) => {
  const { t } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const {
    response: categoryResponse,
    loading: loadingCategories,
    fetchData: fetchCategories
  } = useAxios({
    service: categoryService.getCategories,
    defaultResponse: { items: [] },
    fetchOnMount: true
  })

  const {
    response: subjectResponse,
    loading: loadingSubjects,
    fetchData: fetchSubjects
  } = useAxios({
    service: subjectService.getSubjects,
    defaultResponse: { items: [] },
    fetchOnMount: false
  })

  const {
    response: languageResponse,
    loading: loadingLanguages,
    fetchData: fetchLanguages
  } = useAxios({
    service: languageService.getLanguages,
    defaultResponse: { items: [] },
    fetchOnMount: true
  })

  const categories = categoryResponse.items
  const subjects = subjectResponse.items
  const languages = languageResponse.items

  useEffect(() => {
    console.log('Categories fetched:', categories)
  }, [categories])

  useEffect(() => {
    console.log('Subjects fetched:', subjects)
  }, [subjects])

  useEffect(() => {
    console.log('Languages fetched:', languages)
  }, [languages])

  useEffect(() => {
    if (selectedCategory) {
      fetchSubjects({ categoryId: selectedCategory })
    }
  }, [selectedCategory, fetchSubjects])

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value
    console.log('Selected category:', categoryId)
    setSelectedCategory(categoryId)
    setSelectedSubject('')
  }

  const handleSubjectChange = (event) => {
    const subjectId = event.target.value
    console.log('Selected subject:', subjectId)
    setSelectedSubject(subjectId)
  }

  const handleLanguageChange = (event) => {
    const language = event.target.value
    console.log('Selected language:', language)
    setSelectedLanguage(language)
  }

  return (
    <Drawer
      PaperProps={{ sx: styles.root }}
      anchor={anchor}
      onClose={onClose}
      {...props}
    >
      {closeIcon && (
        <IconButton onClick={onClose} sx={styles.closeButton}>
          <CloseRounded sx={styles.closeIcon} />
        </IconButton>
      )}
      <Box sx={styles.content}>
        <Typography gutterBottom variant='h6'>
          {t('drawer.createNewRequest.title')}
        </Typography>
        <Typography gutterBottom variant='body1'>
          {t('drawer.createNewRequest.description')}
        </Typography>
        <Box component='form' sx={styles.form}>
          <Typography gutterBottom variant='subtitle1'>
            {t('drawer.createNewRequest.describeYourLearningNeeds')}
          </Typography>
          <TextField
            fullWidth
            label={t('drawer.createNewRequest.category')}
            margin='normal'
            select
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={loadingCategories}
            SelectProps={{
              native: true
            }}
          >
            <option value='' />
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </TextField>
          <TextField
            fullWidth
            label={t('drawer.createNewRequest.subject')}
            margin='normal'
            select
            value={selectedSubject}
            onChange={handleSubjectChange}
            disabled={loadingSubjects || !subjects.length}
            SelectProps={{
              native: true
            }}
          >
            <option value='' />
            {Array.isArray(subjects) &&
              subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.name}
                </option>
              ))}
          </TextField>
          <Typography gutterBottom variant='subtitle1'>
            {t('drawer.createNewRequest.selectPreparationLevel')}
          </Typography>
          {[
            'beginner',
            'intermediate',
            'advanced',
            'testPreparation',
            'professional',
            'specialized'
          ].map((level) => (
            <FormControlLabel
              control={<Checkbox />}
              key={level}
              label={t(`drawer.createNewRequest.levels.${level}`)}
            />
          ))}
          <Typography gutterBottom variant='subtitle1'>
            {t('drawer.createNewRequest.preferredTeachingParameters')}
          </Typography>
          <TextField
            fullWidth
            label={t('drawer.createNewRequest.describeYourOffer')}
            margin='normal'
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label={t('drawer.createNewRequest.tutoringLanguages')}
            margin='normal'
            select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            disabled={loadingLanguages}
            SelectProps={{
              native: true
            }}
          >
            <option value='' />
            {Array.isArray(languages) &&
              languages.map((language) => (
                <option key={language._id} value={language._id}>
                  {language.name}
                </option>
              ))}
          </TextField>
          <Typography gutterBottom variant='subtitle1'>
            {t('drawer.createNewRequest.setPreferredOfferValue')}
          </Typography>
          <Slider
            defaultValue={500}
            max={3500}
            min={100}
            valueLabelDisplay='auto'
          />
          <Button color='primary' sx={styles.button} variant='contained'>
            {t('drawer.createNewRequest.createOffer')}
          </Button>
          <Button sx={styles.button} variant='outlined'>
            {t('drawer.createNewRequest.addToDrafts')}
          </Button>
        </Box>
      </Box>
      {children}
    </Drawer>
  )
}

export default AppDrawer
