import React, { useState, useEffect, ChangeEvent } from 'react'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'
import TextFieldGroup from './TextFieldGroup'
import { useStepContext } from '~/context/step-context'
import {
  FormSectionProps,
  StepContextType
} from '~/containers/tutor-home-page/general-info-step/interfaces/IFormSection'
import { useFormSectionStyles } from '~/containers/tutor-home-page/general-info-step/FormSection.styles'

const FormSection: React.FC<FormSectionProps> = ({ btnsBox }) => {
  const classes = useFormSectionStyles()
  const {
    isOverEighteen,
    handleOverEighteenChange,
    isNextDisabled,
    checkboxError
  } = useStepContext() as StepContextType

  const [isConfirmed, setIsConfirmed] = useState<boolean>(isOverEighteen)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    setIsConfirmed(isOverEighteen)
  }, [isOverEighteen])

  useEffect(() => {
    handleOverEighteenChange(isConfirmed)
  }, [isConfirmed, handleOverEighteenChange])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setIsConfirmed(isChecked)
    handleOverEighteenChange(isChecked)
  }

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <Box className={classes.formSection} data-testid='form-section'>
      <Box className={classes.contentBox} data-testid='content-box'>
        <Typography
          className={classes.topFormText}
          gutterBottom
          variant='body1'
        >
          Amet minim mollit non deserunt sit aliqua dolor do amet sint.
        </Typography>
        <TextFieldGroup
          message={message}
          messageLength={message.length}
          onMessageChange={handleMessageChange}
        />
        {checkboxError && (
          <Typography color='error' variant='body2'>
            {checkboxError}
          </Typography>
        )}
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
