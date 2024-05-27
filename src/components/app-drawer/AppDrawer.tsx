import React from 'react'
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
        <Box component='form' sx={styles.form}>
          <Typography gutterBottom variant='subtitle1'>
            {t('drawer.createNewRequest.describeYourLearningNeeds')}
          </Typography>
          <TextField
            fullWidth
            label={t('drawer.createNewRequest.category')}
            margin='normal'
            select
          >
            <option value='' />
            {/*  categories  */}
          </TextField>
          <TextField
            fullWidth
            label={t('drawer.createNewRequest.subject')}
            margin='normal'
            select
          >
            <option value='' />
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
          >
            <option value='ukrainian'>Ukrainian</option>
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
