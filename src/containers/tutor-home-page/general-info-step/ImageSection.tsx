import React from 'react'
import Box from '@mui/material/Box'
import generalInfoStepImage from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const ImageSection: React.FC = () => {
  return (
    <Box>
      <img alt='general-info-step' src={generalInfoStepImage} />
    </Box>
  )
}

export default ImageSection
