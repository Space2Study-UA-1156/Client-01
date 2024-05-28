import React, { useState } from 'react'
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

const RequestForm: React.FC = () => {
  const { t } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [preparationLevel, setPreparationLevel] = useState<string[]>([])
  const [offerDescription, setOfferDescription] = useState('')
  const [offerValue, setOfferValue] = useState(500)

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value
    setSelectedCategory(categoryId)
    setSelectedSubject('')
  }

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subjectId = event.target.value
    setSelectedSubject(subjectId)
  }

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOfferDescription(event.target.value)
  }

  const handleValueChange = (event: Event, value: number | number[]) => {
    setOfferValue(value as number)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = {
      category: selectedCategory,
      subject: selectedSubject,
      language: selectedLanguage,
      preparationLevel,
      description: offerDescription,
      price: offerValue
    }

    console.log(formData)

    try {
      const response = await offerService.createOffer(formData)
      console.log('Form submitted successfully:', response.data)
    } catch (error) {
      console.error('Error submitting form:', error)
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
        {t('drawer.createNewRequest.title')}
      </Typography>
      <Typography gutterBottom variant='body1'>
        {t('drawer.createNewRequest.description')}
      </Typography>
      <Box component='form' onSubmit={handleSubmitWrapper} sx={styles.form}>
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewRequest.describeYourLearningNeeds')}
        </Typography>
        <TextField
          SelectProps={{
            native: true
          }}
          fullWidth
          label={t('drawer.createNewRequest.category')}
          margin='normal'
          onChange={handleCategoryChange}
          select
          value={selectedCategory}
        >
          <option value='' />
          {['History', 'Physics', 'Chemistry', 'Languages', 'Music'].map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </TextField>
        <TextField
          SelectProps={{
            native: true
          }}
          fullWidth
          label={t('drawer.createNewRequest.subject')}
          margin='normal'
          onChange={handleSubjectChange}
          select
          value={selectedSubject}
        >
          <option value='' />
          {['Math', 'Science', 'English', 'Art'].map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
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
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewRequest.preferredTeachingParameters')}
        </Typography>
        <TextField
          fullWidth
          label={t('drawer.createNewRequest.describeYourOffer')}
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
          label={t('drawer.createNewRequest.tutoringLanguages')}
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
          {t('drawer.createNewRequest.setPreferredOfferValue')}
        </Typography>
        <Slider
          defaultValue={500}
          max={3500}
          min={100}
          onChange={handleValueChange}
          value={offerValue}
          valueLabelDisplay='auto'
        />
        <Button
          color='primary'
          onClick={handleSubmitWrapper}
          sx={styles.button}
          type='submit'
          variant='contained'
        >
          {t('drawer.createNewRequest.createOffer')}
        </Button>
        <Button
          onClick={handleSubmitWrapper}
          sx={styles.button}
          type='submit'
          variant='outlined'
        >
          {t('drawer.createNewRequest.addToDrafts')}
        </Button>
      </Box>
    </Box>
  )
}

export default RequestForm
