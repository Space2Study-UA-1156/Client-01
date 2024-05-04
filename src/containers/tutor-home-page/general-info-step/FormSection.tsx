import React, { useState } from 'react'
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material'
import TextFieldGroup from './TextFieldGroup'
import { useStepContext } from '~/context/step-context'

interface FormSectionProps {
  btnsBox: React.ReactNode
}

const FormSection: React.FC<FormSectionProps> = ({ btnsBox }) => {
  const [message, setMessage] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const { toggleNextButton } = useStepContext()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value.slice(0, 100))
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    setIsConfirmed(isChecked)
    toggleNextButton(!isChecked)
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
      <Box sx={{ marginTop: '20px' }}>{btnsBox}</Box>
    </Box>
  )
}

export default FormSection
