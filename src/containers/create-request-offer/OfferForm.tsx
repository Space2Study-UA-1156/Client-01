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
import useAxios from '~/hooks/use-axios'

const OfferForm: React.FC<{ user: any }> = () => {
  const { t } = useTranslation()

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
    fetchOnMount: false
  })

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const categoryId = event.target.value
    setSelectedCategory(categoryId)
    setSelectedSubject('')
  }

  const handleSubjectChange = (event: { target: { value: any } }) => {
    const subjectId = event.target.value
    setSelectedSubject(subjectId)
  }

  const handleLanguageChange = (event: { target: { value: any } }) => {
    const language = event.target.value
    setSelectedLanguage(language)
  }

  const handlePreparationLevelChange = (event: { target: { value: any } }) => {
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

    console.log('Form Data:', formData)

    try {
      const response = await createOffer(formData)
      console.log('Offer created:', response)
    } catch (error) {
      console.error('Error creating offer:', error)
    }
  }

  return (
    <Box sx={styles.content}>
      <Typography gutterBottom variant='h6'>
        {t('drawer.createNewOffer.title')}
      </Typography>
      <Typography gutterBottom variant='body1'>
        {t('drawer.createNewOffer.description')}
      </Typography>
      <Box component='form' sx={styles.form} onSubmit={handleSubmit}>
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
          label={t('drawer.createNewOffer.subject')}
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
          rows={1}
          value={offerTitle}
          onChange={handleTitleChange}
        />
        <TextField
          fullWidth
          label={t('drawer.createNewOffer.describeYourOffer')}
          margin='normal'
          multiline
          rows={4}
          value={offerDescription}
          onChange={handleDescriptionChange}
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
          value={offerValue}
          valueLabelDisplay='auto'
          onChange={handleValueChange}
        />
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.faq')}
        </Typography>
        <Button
          color='primary'
          sx={styles.button}
          variant='contained'
          type='submit'
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
