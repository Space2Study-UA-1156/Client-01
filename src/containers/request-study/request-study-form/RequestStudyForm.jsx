import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppButton from '~/components/app-button/AppButton'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import useConfirm from '~/hooks/use-confirm'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { requestService } from '~/services/request-service'
import { categoryService } from '~/services/category-service'
import {
  initialValues,
  validations,
  MAX_LENGTH
} from '~/containers/request-study/request-study-form/constants'
import { snackbarVariants } from '~/constants'
import { styles } from '~/containers/request-study/request-study-form/RequestStudyForm.styles'

const RequestStudyForm = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { setAlert } = useSnackBarContext()
  const { closeModal } = useModalContext()
  const [categoryId, setCategoryId] = useState(null)

  const showSuccessAlert = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'categoriesPage.newSubject.successMessage'
    })

    closeModal()
  }

  const showErrorAlert = (e) => {
    setAlert({
      severity: snackbarVariants.error,
      message: `errors.${e.code}`
    })
  }

  const { fetchData: createStudyRequest } = useAxios({
    service: requestService.createRequest,
    fetchOnMount: false,
    onResponse: showSuccessAlert,
    onResponseError: showErrorAlert
  })

  const {
    data,
    errors,
    handleSubmit,
    handleNonInputValueChange,
    handleInputChange,
    handleBlur,
    isDirty
  } = useForm({
    onSubmit: () => {
      const body = {
        ...data,
        categoryId,
        categoryName: data.category
      }

      createStudyRequest(body)
    },
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const handleAutocompleteValueChange = (e, value) => {
    if (typeof value === 'string') {
      handleNonInputValueChange('category', value)
      setCategoryId(null)
      return
    }

    handleNonInputValueChange('category', value?.name ?? '')
    setCategoryId(value?._id ?? null)
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
          onChange={handleAutocompleteValueChange}
          onInputChange={handleAutocompleteValueChange}
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
          errorMsg={t(errors.information)}
          fullWidth
          maxLength={MAX_LENGTH}
          onBlur={handleBlur('information')}
          onChange={handleInputChange('information')}
          placeholder={t('categoriesPage.newSubject.labels.information')}
          sx={styles.placeholder}
          value={data.information}
        />
      </Box>

      <AppButton disabled={hasErrors} sx={styles.button} type='submit'>
        {t('button.sendRequest')}
      </AppButton>
    </Box>
  )
}

export default RequestStudyForm
