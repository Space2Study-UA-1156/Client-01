import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isLaptopAndAbove } = useBreakpoints()
  const { handleStepData, stepData } = useStepContext()
  const [errorMessage, setErrorMessage] = useState('')

  const { photo } = stepData
  const filePreviewSrc = photo[0] ? URL.createObjectURL(photo[0]) : ''

  const handleAddPhoto = ({ error, files }) => {
    setErrorMessage(error ?? '')
    handleStepData('photo', files)
  }

  const filePreview = filePreviewSrc ? (
    <Box sx={style.filePreviewContainer}>
      <Box
        alt={t('becomeTutor.photo.imageAlt')}
        component='img'
        src={filePreviewSrc}
        sx={style.filePreview}
      />
    </Box>
  ) : (
    <DragAndDrop
      emitter={handleAddPhoto}
      style={style.dragAndDrop}
      validationData={validationData}
    >
      <Typography variant='body2'>
        {t('becomeTutor.photo.placeholder')}
      </Typography>
    </DragAndDrop>
  )

  return (
    <Box sx={style.root}>
      {isLaptopAndAbove && filePreview}

      <Box sx={style.rightBox}>
        <Box sx={style.contentBox}>
          <Typography>{t('becomeTutor.photo.description')}</Typography>

          <Box>
            <FileUploader
              buttonText={t('becomeTutor.photo.button')}
              emitter={handleAddPhoto}
              initialError={errorMessage}
              initialState={photo}
              validationData={validationData}
            />
          </Box>

          {(isMobile || isTablet) && filePreview}
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
