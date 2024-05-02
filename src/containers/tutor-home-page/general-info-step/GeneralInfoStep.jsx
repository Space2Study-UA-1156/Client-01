import React, { useState } from 'react'
import Box from '@mui/material/Box'
import './GeneralInfoStep.styles'
import generalInfoStepImage from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'
import { useTranslation } from 'react-i18next'
import {
  Grid,
  Paper,
  Container,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem
} from '@mui/material'
import useStyles from './GeneralInfoStep.styles'
import AppTextField from '~/components/app-text-field/AppTextField'

const GeneralInfoStep = ({ btnsBox }) => {
  const [message, setMessage] = useState('')
  const handleInputChange = (event) => {
    setMessage(event.target.value.slice(0, 100))
  }
  const handleFormSubmit = (event) => {
    event.preventDefault()
  }
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid className={classes.imageItem} item md={6} xs={12}>
        <Box
          alt='general-info-step'
          component='img'
          src={generalInfoStepImage}
        />
      </Grid>
      <Grid>
        <Paper className={classes.formContainer}>
          <form onSubmit={handleFormSubmit}>
            <div className={classes.row}>
              <Typography gutterBottom variant='body1'>
                Amet minim mollit non deserunt sit aliqua dolor do amet sint.
              </Typography>
            </div>
            <div className={classes.row}>
              <AppTextField
                errorMsg={undefined}
                label={t('common.labels.firstName')}
                multiline={undefined}
                name='firstName'
                required
                variant='outlined'
              />
              <AppTextField
                errorMsg={undefined}
                label={t('common.labels.lastName')}
                multiline={undefined}
                name='lastName'
                required
                variant='outlined'
              />
            </div>
            <div className={classes.row}>
              <FormControl className={classes.fullWidthInput}>
                <InputLabel>{t('common.labels.country')}</InputLabel>
                <Select
                  className={classes.halfWidthInput}
                  label={t('labels.country')}
                >
                  <MenuItem value='Ukraine'>Ukraine</MenuItem>
                  <MenuItem value='Deutschland'>Deutschland</MenuItem>
                  <MenuItem value='Lithuania'>Lithuania</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.fullWidthInput}>
                <InputLabel>{t('common.labels.city')}</InputLabel>
                <Select
                  className={classes.halfWidthInput}
                  label={t('labels.city')}
                >
                  <MenuItem value='Kyiv'>Kyiv</MenuItem>
                  <MenuItem value='Berlin'>Berlin</MenuItem>
                  <MenuItem value='Vilnius'>Vilnius</MenuItem>
                </Select>
              </FormControl>
            </div>
            <AppTextField
              className={classes.fullWidthInput}
              errorMsg={undefined}
              helperText={`${message.length}/100`}
              label='Describe in short your professional status'
              multiline
              onChange={handleInputChange}
              rows='5'
              value={message}
              variant='outlined'
            />
          </form>
        </Paper>
        {btnsBox}
      </Grid>
    </Container>
  )
}

export default GeneralInfoStep
