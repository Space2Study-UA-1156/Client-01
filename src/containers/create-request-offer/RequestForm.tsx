import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import { useTranslation } from 'react-i18next'
import { offerService } from '~/services/offer-service'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import useAxios from '~/hooks/use-axios'
import axios from 'axios'
import { emptyField } from '~/utils/validations/common'
import ICategory from '~/containers/create-request-offer/interfaces/ICategory'
import ISubject from '~/containers/create-request-offer/interfaces/ISubject'
import AppChip from '~/components/app-chip/AppChip'
import { userOfferFormStyles } from '~/containers/create-request-offer/OfferForm.styles'

const RequestForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useTranslation()
  const classes = userOfferFormStyles()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [subjects, setSubjects] = useState<ISubject[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([])
  const [preparationLevel, setPreparationLevel] = useState<string[]>([])
  const [offerDescription, setOfferDescription] = useState('')
  const [offerValue, setOfferValue] = useState<number>(580)
  const [offerTitle, setOfferTitle] = useState('')

  const [categoryError, setCategoryError] = useState('')
  const [subjectError, setSubjectError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [titleError, setTitleError] = useState('')

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
    if (!selectedLanguage.includes(language) && language) {
      setSelectedLanguage([...selectedLanguage, language])
    }
  }

  const handleLanguageDelete = (languageToDelete: string) => {
    setSelectedLanguage((languages) =>
      languages.filter((language) => language !== languageToDelete)
    )
  }

  const handlePreparationLevelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target
    setPreparationLevel((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    )
  }

  const handleDescriptionChange = (event: { target: { value: any } }) => {
    setOfferDescription(event.target.value)
    validateField('description', event.target.value)
  }

  const handleTitleChange = (event: { target: { value: any } }) => {
    setOfferTitle(event.target.value)
    validateField('title', event.target.value)
  }

  const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    if (newValue < offerValue) {
      setOfferValue(newValue)
    }
  }

  const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value)
    if (newValue > offerValue) {
      setOfferValue(newValue)
    }
  }

  const validateField = (field: string, value: string) => {
    let error = ''
    switch (field) {
      case 'description':
        error = emptyField(value, t('common.errorMessages.emptyField'))
        setDescriptionError(error)
        break
      case 'category':
        error = emptyField(value, t('common.errorMessages.emptyField'))
        setCategoryError(error)
        break
      case 'subject':
        error = emptyField(value, t('common.errorMessages.emptyField'))
        setSubjectError(error)
        break
      case 'title':
        error = emptyField(value, t('common.errorMessages.emptyField'))
        setTitleError(error)
        break
    }
  }

  useEffect(() => {
    const isValid: boolean =
      !!selectedCategory &&
      !!selectedSubject &&
      !!offerDescription &&
      !!offerTitle &&
      !categoryError &&
      !subjectError &&
      !descriptionError &&
      !titleError
    setIsFormValid(isValid)
  }, [
    categoryError,
    subjectError,
    descriptionError,
    titleError,
    selectedCategory,
    selectedSubject,
    offerDescription,
    offerTitle
  ])

  const resetForm = () => {
    setSelectedCategory('')
    setSelectedSubject('')
    setSelectedLanguage([])
    setPreparationLevel([])
    setOfferDescription('')
    setOfferValue(580)
    setOfferTitle('')
    setCategoryError('')
    setSubjectError('')
    setDescriptionError('')
    setTitleError('')
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
      description: offerDescription,
      price: offerValue,
      title: offerTitle
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
    <Box className={classes.drawerContainer}>
      <Box className={classes.drawerHeaderWrapper} mb={2}>
        <Box className={classes.drawerIcon} ml={1}>
          <svg
            fill='none'
            height='24'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <mask
              height='24'
              id='mask0_4873_63761'
              maskUnits='userSpaceOnUse'
              width='24'
              x='0'
              y='0'
            >
              <rect fill='#455A64' height='24' width='24' />
            </mask>
            <g mask='url(#mask0_4873_63761)'>
              <path
                d='M3.82433 13.8957C3.36985 13.9281 3 13.5554 3 13.0998C3 12.6442 3.37006 12.2789 3.82403 12.24C4.80035 12.1565 5.72567 11.9223 6.6 11.5374C7.7168 11.0458 8.696 10.3834 9.5376 9.5502C10.3792 8.7166 11.0458 7.7332 11.5374 6.6C11.9212 5.71537 12.1551 4.79003 12.2393 3.82398C12.2789 3.37007 12.6442 3 13.0998 3C13.5554 3 13.9281 3.36985 13.8957 3.82433C13.8102 5.02011 13.5367 6.15774 13.0752 7.2372C12.5084 8.5624 11.725 9.725 10.725 10.725C9.725 11.725 8.5624 12.5084 7.2372 13.0752C6.15774 13.5367 5.02011 13.8102 3.82433 13.8957ZM3.83648 10.5602C3.37608 10.6052 3 10.2252 3 9.7626C3 9.30001 3.37676 8.93178 3.83545 8.87181C5.11436 8.70459 6.23168 8.14312 7.1874 7.1874C8.14312 6.23168 8.70459 5.11436 8.87181 3.83545C8.93178 3.37676 9.30001 3 9.7626 3C10.2252 3 10.6052 3.37608 10.5602 3.83648C10.3885 5.59393 9.66424 7.11091 8.3874 8.3874C7.11091 9.66424 5.59393 10.3885 3.83648 10.5602ZM4.93065 6.83036C3.94662 7.3321 3 6.37957 3 5.275V5C3 3.89543 3.89543 3 5 3H5.275C6.37957 3 7.3321 3.94662 6.83036 4.93065C6.62981 5.32396 6.36142 5.68881 6.0252 6.0252C5.68881 6.36142 5.32396 6.62981 4.93065 6.83036ZM10.9002 21C10.4446 21 10.0719 20.6301 10.1043 20.1757C10.1898 18.9799 10.4633 17.8423 10.9248 16.7628C11.4916 15.4376 12.275 14.275 13.275 13.275C14.275 12.275 15.4376 11.4916 16.7628 10.9248C17.8423 10.4633 18.9799 10.1898 20.1757 10.1043C20.6301 10.0719 21 10.4446 21 10.9002C21 11.3558 20.6299 11.7211 20.176 11.76C19.1997 11.8435 18.2743 12.0777 17.4 12.4626C16.2832 12.9542 15.304 13.6166 14.4624 14.4498C13.6208 15.2834 12.9542 16.2668 12.4626 17.4C12.0788 18.2846 11.8449 19.21 11.7607 20.176C11.7211 20.6299 11.3558 21 10.9002 21ZM14.2374 21C13.7748 21 13.3948 20.6239 13.4398 20.1635C13.6115 18.4061 14.3358 16.8891 15.6126 15.6126C16.8891 14.3358 18.4061 13.6115 20.1635 13.4398C20.6239 13.3948 21 13.7748 21 14.2374C21 14.7 20.6232 15.0682 20.1646 15.1282C18.8856 15.2954 17.7683 15.8569 16.8126 16.8126C15.8569 17.7683 15.2954 18.8856 15.1282 20.1645C15.0682 20.6232 14.7 21 14.2374 21ZM18.725 21C17.6204 21 16.6679 20.0534 17.1696 19.0694C17.3702 18.676 17.6386 18.3112 17.9748 17.9748C18.3112 17.6386 18.676 17.3702 19.0694 17.1696C20.0534 16.6679 21 17.6204 21 18.725V19C21 20.1046 20.1046 21 19 21H18.725Z'
                fill='#455A64'
              />
            </g>
          </svg>
        </Box>
        <Typography className={classes.drawerHeader} gutterBottom variant='h6'>
          {t('drawer.createNewRequest.title')}
        </Typography>
      </Box>
      <Typography className={classes.drawerDesc} gutterBottom variant='body1'>
        {t('drawer.createNewRequest.description')}
      </Typography>
      <Box component='form' onSubmit={handleSubmitWrapper}>
        <Box alignItems='center' display='flex' gap='15px' mb={2}>
          <Box className={classes.numberBox}>1</Box>
          <Typography
            className={classes.drawerSubtitle}
            gutterBottom
            variant='subtitle1'
          >
            {t('drawer.createNewRequest.describeYourLearningNeeds')}
          </Typography>
        </Box>
        <TextField
          SelectProps={{
            native: true
          }}
          error={!!categoryError}
          fullWidth
          helperText={categoryError}
          label={t('drawer.createNewRequest.category')}
          margin='normal'
          onBlur={() => validateField('category', selectedCategory)}
          onChange={handleCategoryChange}
          select
          value={selectedCategory}
        >
          <option value='' />
          {categories.map((category: ICategory) => (
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
          label={t('drawer.createNewRequest.subject')}
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
        <Typography className={classes.desc} gutterBottom variant='subtitle1'>
          {t('drawer.createNewRequest.selectPreparationLevel')}
        </Typography>
        <Box className={classes.checkboxWrapper}>
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
              label={t(`drawer.createNewRequest.levels.${level}`)}
            />
          ))}
        </Box>
        <Box className={classes.drawerHeaderWrapper} mb={2}>
          <Box className={classes.numberBox}>2</Box>
          <Typography
            className={classes.drawerSubtitle}
            gutterBottom
            variant='subtitle1'
          >
            {t('drawer.createNewRequest.preferredTeachingParameters')}
          </Typography>
        </Box>
        <Typography>
          {t('drawer.createNewRequest.describeYourOffer')}
        </Typography>
        <TextField
          error={!!descriptionError}
          fullWidth
          helperText={`${offerDescription.length}/1000`}
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
          label={t('drawer.createNewRequest.tutoringLanguages')}
          margin='normal'
          onChange={handleLanguageChange}
          select
          value=''
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
        <Box mb={2}>
          <Box>
            {selectedLanguage.map((language) => (
              <AppChip
                handleDelete={() => handleLanguageDelete(language)}
                icon={undefined}
                key={language}
                labelSx={undefined}
                sx={undefined}
              >
                {language}
              </AppChip>
            ))}
          </Box>
        </Box>
        <Box alignItems='center' display='flex' gap='15px' mb={2}>
          <Box className={classes.numberBox}>3</Box>
          <Typography
            className={classes.drawerSubtitle}
            gutterBottom
            variant='subtitle1'
          >
            {t('drawer.createNewRequest.setPreferredOfferValue')}
          </Typography>
        </Box>
        <Typography>{t('drawer.createNewRequest.offerValue')}</Typography>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <TextField
            label={t('drawer.createNewRequest.minValue')}
            onChange={handleMinValueChange}
            type='number'
            value={offerValue}
          />
          <TextField
            label={t('drawer.createNewRequest.maxValue')}
            onChange={handleMaxValueChange}
            type='number'
            value={offerValue}
          />
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button
            color='primary'
            disabled={!isFormValid}
            type='submit'
            variant='contained'
          >
            {t('drawer.createNewRequest.createOffer')}
          </Button>
          <Button variant='outlined'>
            {t('drawer.createNewRequest.addToDrafts')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RequestForm
