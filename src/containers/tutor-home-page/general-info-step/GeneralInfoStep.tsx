import React, { ReactNode } from 'react'
import { Container, Box } from '@mui/material'
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
      <Box className={classes.contentContainer} data-testid='content-container'>
        <ImageSection data-testid='image-section' />
        <FormSection
          btnsBox={
            <Box className={classes.btnContainer} data-testid='btn-container'>
              {btnsBox}
            </Box>
          }
        />
      </Box>
    </Container>
  )
}

export default GeneralInfoStep
