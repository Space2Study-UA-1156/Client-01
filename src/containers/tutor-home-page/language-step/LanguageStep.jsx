import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import languageStepImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import { useStepContext } from '~/context/step-context'
import { languageService } from '~/services/language-service'
import { defaultResponses } from '~/constants'
import useAxios from '~/hooks/use-axios'
import useBreakpoints from '~/hooks/use-breakpoints'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { isTablet, isMobile, isLaptopAndAbove } = useBreakpoints()
  const { stepData, handleStepData } = useStepContext()
  const { t } = useTranslation()
  const [inputValue, setInputValue] = useState('')

  const selectedLanguage = stepData[stepLabel]

  const { response } = useAxios({
    service: languageService.getLanguages,
    defaultResponse: defaultResponses.array
  })

  const handleChange = (event, newValue) => {
    handleStepData(stepLabel, newValue)
  }

  const handleOnInputChange = (event, newInputValue) => {
    setInputValue(newInputValue)
  }

  const LanguageStepImage = (
    <Box
      alt='LanguageStep image'
      component='img'
      src={languageStepImg}
      sx={styles.languageStepImage}
    />
  )

  return (
    <Box sx={styles.container}>
      {isLaptopAndAbove && LanguageStepImage}
      <Box sx={styles.contentWrapper}>
        <Box sx={styles.itemsWrapper}>
          <Typography>{t('becomeTutor.languages.title')}</Typography>
          {(isMobile || isTablet) && LanguageStepImage}
          <Autocomplete
            inputValue={inputValue}
            onChange={handleChange}
            onInputChange={handleOnInputChange}
            options={response}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('becomeTutor.languages.autocompleteLabel')}
              />
            )}
            value={selectedLanguage}
          />
        </Box>
        <Box>{btnsBox}</Box>
      </Box>
    </Box>
  )
}
export default LanguageStep
