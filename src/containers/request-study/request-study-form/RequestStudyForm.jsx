import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppButton from '~/components/app-button/AppButton'

import useForm from '~/hooks/use-form'
import useConfirm from '~/hooks/use-confirm'
import {
  validations,
  initialValues,
  MAX_LENGTH
} from '~/containers/request-study/request-study-form/constants'
import { categoryService } from '~/services/category-service'
import { styles } from '~/containers/request-study/request-study-form/RequestStudyForm.styles'

const RequestStudyForm = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const [existingCategoryId, setExistingCategoryId] = useState(null)

  const {
    data,
    errors,
    handleSubmit,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    isDirty
  } = useForm({
    onSubmit: () => {
      if (!existingCategoryId) {
        return
      }
    },
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const handleChangeCategory = (event, category) => {
    if (typeof category === 'string') {
      handleNonInputValueChange('category', category)
      return
    }

    handleNonInputValueChange('category', category?.name ?? '')
    setExistingCategoryId(category?._id ?? null)
  }

  const hasErrors = Object.values(errors).filter(Boolean).length > 0

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Box>
        <Typography sx={styles.label}>
          {t('categoriesPage.newSubject.subject')}
        </Typography>

        <AppTextField
          errorMsg={t(errors.subject)}
          fullWidth
          onBlur={handleBlur('subject')}
          onChange={handleInputChange('subject')}
          placeholder={t('categoriesPage.newSubject.labels.subject')}
          sx={styles.placeholder}
          value={data.subject}
        />
      </Box>

      <Box>
        <Typography sx={styles.label}>
          {t('categoriesPage.newSubject.category')}
        </Typography>

        <AsyncAutocomplete
          fetchOnFocus
          freeSolo
          inputValue={data.category}
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={handleChangeCategory}
          onInputChange={handleChangeCategory}
          service={categoryService.getCategoriesNames}
          sx={styles.placeholder}
          textFieldProps={{
            placeholder: t('categoriesPage.newSubject.labels.category'),
            error: Boolean(errors.category),
            helperText: ` ${t(errors.category)}`
          }}
          value={data.category}
          valueField='name'
        />
      </Box>

      <Box>
        <Typography sx={styles.label}>
          {t('categoriesPage.newSubject.info')}
        </Typography>

        <AppTextArea
          errorMsg={t(errors.info)}
          fullWidth
          maxLength={MAX_LENGTH}
          onBlur={handleBlur('info')}
          onChange={handleInputChange('info')}
          placeholder={t('categoriesPage.newSubject.labels.info')}
          sx={styles.placeholder}
          value={data.info}
        />
      </Box>

      <AppButton disabled={hasErrors} sx={styles.button} type='submit'>
        {t('button.sendRequest')}
      </AppButton>
    </Box>
  )
}

export default RequestStudyForm
