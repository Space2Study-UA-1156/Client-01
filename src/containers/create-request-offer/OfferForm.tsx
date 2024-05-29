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
import axios from 'axios'
import { emptyField, nameField, textField } from '~/utils/validations/common'

interface Category {
  _id: string
  name: string
}

interface Subject {
  _id: string
  name: string
}

const OfferForm: React.FC<{ user: any }> = () => {
  const { t } = useTranslation()

  const [categories, setCategories] = useState<Category[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [preparationLevel, setPreparationLevel] = useState<string[]>([])
  const [offerTitle, setOfferTitle] = useState('')
  const [offerDescription, setOfferDescription] = useState('')
  const [offerValue, setOfferValue] = useState(500)

  const [titleError, setTitleError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [subjectError, setSubjectError] = useState('')

  const [isFormValid, setIsFormValid] = useState(false)

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

    void fetchCategories()
  }, [])

  const fetchSubjects = async (categoryId: string) => {
    try {
      const subjectsResponse = await subjectService.getSubjectsNames(categoryId)
      setSubjects(subjectsResponse.data)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const categoryId = event.target.value
    setSelectedCategory(categoryId)
    setSelectedSubject('')
    void fetchSubjects(categoryId)
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

  const validateField = (field: string, value: string) => {
    let error = ''
    switch (field) {
      case 'title':
        error =
          emptyField(value, t('common.errorMessages.emptyField')) ||
          nameField(value)
        setTitleError(t(error))
        break
      case 'description':
        error =
          emptyField(value, t('common.errorMessages.emptyField')) ||
          textField(10, 300)(value)
        setDescriptionError(t(error))
        break
      case 'category':
        error = emptyField(value, t('common.errorMessages.emptyField'))
        setCategoryError(t(error))
        break
      case 'subject':
        error = emptyField(value, t('common.errorMessages.emptyField'))
        setSubjectError(t(error))
        break
    }
  }

  useEffect(() => {
    const isValid =
      !titleError && !descriptionError && !categoryError && !subjectError
    setIsFormValid(isValid)
  }, [titleError, descriptionError, categoryError, subjectError])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!isFormValid) {
      return
    }

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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error creating offer:', error.response.data)
        } else {
          console.error('Error creating offer:', error.message)
        }
      } else {
        console.error('Unknown error:', error)
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
          error={!!categoryError}
          fullWidth
          helperText={categoryError}
          label={t('drawer.createNewOffer.category')}
          margin='normal'
          onBlur={() => validateField('category', selectedCategory)}
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
          error={!!subjectError}
          fullWidth
          helperText={subjectError}
          label={t('drawer.createNewOffer.subject')}
          margin='normal'
          onBlur={() => validateField('subject', selectedSubject)}
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
          error={!!titleError}
          fullWidth
          helperText={titleError}
          label={t('drawer.createNewOffer.title')}
          margin='normal'
          multiline
          onBlur={() => validateField('title', offerTitle)}
          onChange={handleTitleChange}
          rows={1}
          value={offerTitle}
        />
        <TextField
          error={!!descriptionError}
          fullWidth
          helperText={descriptionError}
          label={t('drawer.createNewOffer.describeYourOffer')}
          margin='normal'
          multiline
          onBlur={() => validateField('description', offerDescription)}
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
          disabled={!isFormValid}
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
