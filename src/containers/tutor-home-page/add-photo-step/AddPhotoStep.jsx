import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'

import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { useStepContext } from '~/context/step-context'
import useBreakpoints from '~/hooks/use-breakpoints'
import { imageResize } from '~/utils/image-resize'
import { style } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.style'

const AddPhotoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { isMobile, isTablet, isLaptopAndAbove } = useBreakpoints()
  const { handleStepData, stepData } = useStepContext()
  const [errorMessage, setErrorMessage] = useState('')

  const { photo } = stepData

  const handleAddPhoto = async ({ error, files }) => {
    if (error) {
      setErrorMessage(error)
      return
    }

    if (!files.length) {
      setErrorMessage('')
      handleStepData('photo', files)
      return
    }

    const [file] = files

    const url = URL.createObjectURL(file)
    const resizedImageUrl = await imageResize(url, {
      newHeight: 440,
      newWidth: 440
    })

    const image = {
      src: resizedImageUrl,
      name: file.name
    }

    setErrorMessage('')
    handleStepData('photo', [image])
  }

  const photoContainer = (
    <DragAndDrop
      emitter={handleAddPhoto}
      style={style.dragAndDrop}
      validationData={validationData}
    >
      {photo.length ? (
        <Box
          alt={t('becomeTutor.photo.imageAlt')}
          component='img'
          src={photo[0].src}
          sx={style.photoPreview}
        />
      ) : (
        <Typography variant='body2'>
          {t('becomeTutor.photo.placeholder')}
        </Typography>
      )}
    </DragAndDrop>
  )

  return (
    <Box sx={style.root}>
      {isLaptopAndAbove && photoContainer}

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

          {(isMobile || isTablet) && photoContainer}
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default AddPhotoStep
