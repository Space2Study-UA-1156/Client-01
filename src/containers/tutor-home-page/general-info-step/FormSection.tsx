import React, { useState } from 'react'
import { Typography } from '@mui/material'

import TextFieldGroup from './TextFieldGroup'

const FormSection: React.FC = () => {
  const [message, setMessage] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value.slice(0, 100))
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <Typography gutterBottom variant='body1'>
        Amet minim mollit non deserunt sit aliqua dolor do amet sint.
      </Typography>
      <TextFieldGroup
        message={message}
        messageLength={message.length}
        onMessageChange={handleInputChange}
      />
    </form>
  )
}

export default FormSection
