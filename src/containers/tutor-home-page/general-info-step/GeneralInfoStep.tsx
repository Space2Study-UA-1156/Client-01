import React, { ReactNode } from 'react'
import { Container } from '@mui/material'
import ImageSection from './ImageSection'
import FormSection from './FormSection'
interface GeneralInfoStepProps {
  btnsBox: ReactNode
}

const GeneralInfoStep: React.FC<GeneralInfoStepProps> = ({ btnsBox }) => {
  return (
    <Container>
      <div>
        <ImageSection />
      </div>
      <div>
        <FormSection btnsBox />
      </div>
      {btnsBox}
    </Container>
  )
}

export default GeneralInfoStep
