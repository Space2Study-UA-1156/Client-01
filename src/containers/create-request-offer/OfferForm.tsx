import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { styles } from '~/components/app-drawer/AppDrawer.styles'
import { offerService } from '~/services/offer-service'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import useAxios from '~/hooks/use-axios'
import axios from 'axios'
import { emptyField, nameField, textField } from '~/utils/validations/common'
import ICategory from '~/containers/create-request-offer/interfaces/ICategory'
import ISubject from '~/containers/create-request-offer/interfaces/ISubject'
import AppTextField from '~/components/app-text-field/AppTextField'
import TextField from '@mui/material/TextField'

const OfferForm: React.FC<{ user: any; onClose: () => void }> = ({
  onClose
}) => {
  const { t } = useTranslation()

  const [categories, setCategories] = useState<ICategory[]>([])
  const [subjects, setSubjects] = useState<ISubject[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [preparationLevel, setPreparationLevel] = useState<string[]>([])
  const [offerTitle, setOfferTitle] = useState('')
  const [offerDescription, setOfferDescription] = useState('')
  const [offerValue, setOfferValue] = useState(500)

  const [faqs, setFaqs] = useState([
    { question: '', answer: '', answerError: '', touched: false }
  ])

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
    validateField('category', categoryId)
  }

  const handleSubjectChange = (event: { target: { value: any } }) => {
    const subjectId = event.target.value
    setSelectedSubject(subjectId)
    validateField('subject', subjectId)
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
    validateField('title', event.target.value)
  }

  const handleDescriptionChange = (event: { target: { value: any } }) => {
    setOfferDescription(event.target.value)
    validateField('description', event.target.value)
  }

  const handleValueChange = (event: any, value: number | number[]) => {
    setOfferValue(value as number)
  }

  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaqs = [...faqs]
    newFaqs[index][field] = value
    if (field === 'answer') {
      newFaqs[index].answerError =
        value.length > 400 ? t('common.errorMessages.longText') : ''
    }
    setFaqs(newFaqs)
  }

  const handleFaqBlur = (index: number, field: string) => {
    const newFaqs = [...faqs]
    newFaqs[index].touched = true
    setFaqs(newFaqs)
    if (field === 'answer') {
      handleFaqChange(index, field, faqs[index][field])
    }
  }

  const addFaq = () => {
    setFaqs([
      ...faqs,
      { question: '', answer: '', answerError: '', touched: false }
    ])
  }

  const removeFaq = (index: number) => {
    const newFaqs = faqs.filter((_, i) => i !== index)
    setFaqs(newFaqs)
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
    const isValid: boolean =
      !!selectedCategory &&
      !!selectedSubject &&
      !!offerTitle &&
      !!offerDescription &&
      !titleError &&
      !descriptionError &&
      !categoryError &&
      !subjectError &&
      faqs.every((faq) => !faq.answerError && faq.question && faq.answer)
    setIsFormValid(isValid)
  }, [
    titleError,
    descriptionError,
    categoryError,
    subjectError,
    faqs,
    selectedCategory,
    selectedSubject,
    offerTitle,
    offerDescription
  ])

  const resetForm = () => {
    setSelectedCategory('')
    setSelectedSubject('')
    setSelectedLanguage('')
    setPreparationLevel([])
    setOfferTitle('')
    setOfferDescription('')
    setOfferValue(500)
    setFaqs([{ question: '', answer: '', answerError: '', touched: false }])
    setTitleError('')
    setDescriptionError('')
    setCategoryError('')
    setSubjectError('')
  }

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
      price: offerValue,
      FAQ: faqs
    }

    try {
      await createOffer(formData)
      resetForm()
      onClose()
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
        {faqs.map((faq, index) => (
          <Box key={index} mb={2}>
            <AppTextField
              errorMsg={
                faq.touched && !faq.question
                  ? t('common.errorMessages.emptyField')
                  : ''
              }
              fullWidth
              label={t('drawer.createNewOffer.insertQuestion')}
              margin='normal'
              multiline
              name={`question-${index}`}
              onBlur={() => handleFaqBlur(index, 'question')}
              onChange={(e) =>
                handleFaqChange(index, 'question', e.target.value)
              }
              rows={1}
              value={faq.question}
            />
            <AppTextField
              errorMsg={faq.answerError}
              fullWidth
              helperText={`${faq.answer.length}/400`}
              label={t('drawer.createNewOffer.insertAnswer')}
              margin='normal'
              multiline
              name={`answer-${index}`}
              onBlur={() => handleFaqBlur(index, 'answer')}
              onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
              rows={4}
              value={faq.answer}
            />
            <IconButton aria-label='delete' onClick={() => removeFaq(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addFaq} sx={{ mb: 2 }} variant='outlined'>
          {t('drawer.createNewOffer.addOneMoreQuestion')}
        </Button>
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
