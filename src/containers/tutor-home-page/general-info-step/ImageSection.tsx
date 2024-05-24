import React from 'react'
import Box from '@mui/material/Box'
import generalInfoStepImage from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

const ImageSection: React.FC = () => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'block' },
        width: '100%',
        height: 'auto',
        maxWidth: '600px',
        margin: '0 auto',
        '& img': {
          width: '100%',
          height: 'auto'
        }
      }}
    >
      <img alt='general-info-step' src={generalInfoStepImage} />
    </Box>
  )
}

export default ImageSection
