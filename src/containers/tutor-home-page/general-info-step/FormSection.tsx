import React, { useState, useEffect, ReactElement } from 'react'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'
import TextFieldGroup from './TextFieldGroup'
import { useStepContext } from '~/context/step-context'
import {
  FormSectionProps,
  StepContextType
} from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'

const FormSection: React.FC<FormSectionProps> = ({ btnsBox }) => {
  const { isOverEighteen, handleOverEighteenChange, isNextDisabled, stepData } =
    useStepContext() as StepContextType

  const [message, setMessage] = useState<string>(
    (stepData.general?.data.message as string) || ''
  )
  const [isConfirmed, setIsConfirmed] = useState<boolean>(isOverEighteen)

  useEffect(() => {
    setIsConfirmed(isOverEighteen)
  }, [isOverEighteen])

  useEffect(() => {
    handleOverEighteenChange(isConfirmed)
  }, [isConfirmed, handleOverEighteenChange])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = event.target.value.slice(0, 100)
    setMessage(newMessage)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setIsConfirmed(isChecked)
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
            <Checkbox checked={isConfirmed} onChange={handleCheckboxChange} />
          }
          label='I confirm that I am over 18 years old'
        />
      </Box>
      {React.cloneElement(btnsBox, { disabled: isNextDisabled })}
    </Box>
  )
}

export default FormSection
