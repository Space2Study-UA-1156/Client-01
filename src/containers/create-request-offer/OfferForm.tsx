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

const OfferForm: React.FC<{ user: any }> = () => {
  const { t } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

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

  return (
    <Box sx={styles.content}>
      <Typography gutterBottom variant='h6'>
        {t('drawer.createNewOffer.title')}
      </Typography>
      <Typography gutterBottom variant='body1'>
        {t('drawer.createNewOffer.description')}
      </Typography>
      <Box component='form' sx={styles.form}>
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
            control={<Checkbox />}
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
        />
        <TextField
          fullWidth
          label={t('drawer.createNewOffer.describeYourOffer')}
          margin='normal'
          multiline
          rows={4}
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
          valueLabelDisplay='auto'
        />
        <Typography gutterBottom variant='subtitle1'>
          {t('drawer.createNewOffer.faq')}
        </Typography>
        <Button color='primary' sx={styles.button} variant='contained'>
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
