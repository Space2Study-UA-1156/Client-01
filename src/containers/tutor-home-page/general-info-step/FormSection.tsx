import React, { useState } from 'react'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'
import TextFieldGroup from './TextFieldGroup'
import { useStepContext } from '~/context/step-context'
import {
  FormSectionProps,
  StepContextType
} from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'

const FormSection: React.FC<FormSectionProps> = ({ btnsBox }) => {
  const [message, setMessage] = useState('')
  // eslint-disable-next-line
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { toggleNextButton, isOverEighteen, handleOverEighteenChange } =
    useStepContext() as StepContextType
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value.slice(0, 100)
    setMessage(message)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setIsConfirmed(isChecked)
    toggleNextButton(!isChecked)
    handleOverEighteenChange(isChecked)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '435px' }}>
        <Typography gutterBottom variant='body1'>
          Amet minim mollit non deserunt sit aliqua dolor do amet sint.
        </Typography>
        <TextFieldGroup
          message={message}
          messageLength={message.length}
          onMessageChange={handleInputChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isOverEighteen}
              onChange={handleCheckboxChange}
            />
          }
          label='I confirm that I am over 18 years old'
        />
      </Box>
      {btnsBox}
    </Box>
  )
}

export default FormSection
