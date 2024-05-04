import React, { ReactNode } from 'react'
import { Container } from '@mui/material'
import ImageSection from './ImageSection'
import FormSection from './FormSection'
import { useGeneralInfoStepStyles } from './GeneralInfoStep.styles'

interface GeneralInfoStepProps {
  btnsBox: ReactNode
}

const GeneralInfoStep: React.FC<GeneralInfoStepProps> = ({ btnsBox }) => {
  const classes = useGeneralInfoStepStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.contentContainer}>
        <ImageSection />
        <FormSection btnsBox={btnsBox} />
      </div>
    </Container>
  )
}

export default GeneralInfoStep
