import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/app-drawer/AppDrawer.styles'
import { offerService } from '~/services/offer-service'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import useAxios from '~/hooks/use-axios'

const OfferForm: React.FC<{ user: any }> = () => {
  const { t } = useTranslation()

  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [preparationLevel, setPreparationLevel] = useState<string[]>([])
  const [offerTitle, setOfferTitle] = useState('')
  const [offerDescription, setOfferDescription] = useState('')
  const [offerValue, setOfferValue] = useState(500)

  const { fetchData: createOffer } = useAxios({
    service: offerService.createOffer,
    defaultResponse: {},
    fetchOnMount: false,
    transform: (data: any) => data,
    onResponse: () => {
      // no-op
    },
    onResponseError: () => {
      // no-op
    }
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await categoryService.getCategories()
        setCategories(categoriesResponse.data.items)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const fetchSubjects = async (categoryId: any) => {
    try {
      const subjectsResponse = await subjectService.getSubjectsNames(categoryId)
      setSubjects(subjectsResponse.data)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const handleCategoryChange = async (event: { target: { value: any } }) => {
    const categoryId = event.target.value
    setSelectedCategory(categoryId)
    setSelectedSubject('')
    await fetchSubjects(categoryId)
  }

  const handleSubjectChange = (event: { target: { value: any } }) => {
    const subjectId = event.target.value
    setSelectedSubject(subjectId)
  }

  const handleLanguageChange = (event: { target: { value: any } }) => {
    const language = event.target.value
    setSelectedLanguage(language)
  }

  const handlePreparationLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target
    setPreparationLevel((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    )
  }

  const handleTitleChange = (event: { target: { value: any } }) => {
    setOfferTitle(event.target.value)
  }

  const handleDescriptionChange = (event: { target: { value: any } }) => {
    setOfferDescription(event.target.value)
  }

  const handleValueChange = (event: any, value: number | number[]) => {
    setOfferValue(value as number)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = {
      category: selectedCategory,
      subject: selectedSubject,
      language: selectedLanguage,
      preparationLevel,
      title: offerTitle,
      description: offerDescription,
      price: offerValue
    }

    try {
      const response = await createOffer(formData)
    } catch (error) {
      if (error.response) {
        console.error('Error creating offer:', error.response.data)
      } else {
        console.error('Error creating offer:', error.message)
      }
    }
  }

  const handleSubmitWrapper = (event: React.FormEvent) => {
    handleSubmit(event).catch((error) => {
      console.error('Error handling submit:', error)
    })
  }

  return (
    <Box sx={styles.content}>
      <Typography gutterBottom variant='h6'>
        {t('drawer.createNewOffer.title')}
      </Typography>
      <Typography gutterBottom variant='body1'>
        {t('drawer.createNewOffer.description')}
      </Typography>
      <Box component='form' onSubmit={handleSubmitWrapper} sx={styles.form}>
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.pickYourSpecialization')}
        </Typography>
        <TextField
          SelectProps={{
            native: true
          }}
          fullWidth
          label={t('drawer.createNewOffer.category')}
          margin='normal'
          onChange={handleCategoryChange}
          select
          value={selectedCategory}
        >
          <option value='' />
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </TextField>
        <TextField
          SelectProps={{
            native: true
          }}
          fullWidth
          label={t('drawer.createNewOffer.subject')}
          margin='normal'
          onChange={handleSubjectChange}
          select
          value={selectedSubject}
        >
          <option value='' />
          {subjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </TextField>
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.selectPreparationLevel')}
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
            control={
              <Checkbox
                checked={preparationLevel.includes(level)}
                onChange={handlePreparationLevelChange}
                value={level}
              />
            }
            key={level}
            label={t(`drawer.createNewOffer.levels.${level}`)}
          />
        ))}
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.teachingParameters')}
        </Typography>
        <TextField
          fullWidth
          label={t('drawer.createNewOffer.title')}
          margin='normal'
          multiline
          onChange={handleTitleChange}
          rows={1}
          value={offerTitle}
        />
        <TextField
          fullWidth
          label={t('drawer.createYourOffer.describeYourOffer')}
          margin='normal'
          multiline
          onChange={handleDescriptionChange}
          rows={4}
          value={offerDescription}
        />
        <TextField
          SelectProps={{
            native: true
          }}
          fullWidth
          label={t('drawer.createNewOffer.tutoringLanguages')}
          margin='normal'
          onChange={handleLanguageChange}
          select
          value={selectedLanguage}
        >
          <option value='' />
          {['English', 'Ukrainian', 'Polish', 'German'].map(
            (language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            )
          )}
        </TextField>
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.setPreferredOfferValue')}
        </Typography>
        <Slider
          defaultValue={500}
          max={3500}
          min={100}
          onChange={handleValueChange}
          value={offerValue}
          valueLabelDisplay='auto'
        />
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.faq')}
        </Typography>
        <Button
          color='primary'
          sx={styles.button}
          type='submit'
          variant='contained'
        >
          {t('drawer.createNewOffer.createOffer')}
        </Button>
        <Button sx={styles.button} variant='outlined'>
          {t('drawer.createNewOffer.addToDrafts')}
        </Button>
      </Box>
    </Box>
  )
}

export default OfferForm
