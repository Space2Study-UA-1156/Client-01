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
import useAxios from '~/hooks/use-axios'
import { subjectService } from '~/services/subject-service'

const RequestStudyForm = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const [existingCategoryId, setExistingCategoryId] = useState(null)

  const onSubmit = async () => {
    if (!existingCategoryId) {
      createCategory({
        name: formValues.category,
        appearance: {
          path: 'path-to-icon',
          color: '#f9f9f9'
        }
      })
    } else {
      await createSubject({
        name: formValues.subject,
        category: existingCategoryId
      })
    }
  }

  const { fetchData: createSubject, loading: subjectLoading } = useAxios({
    service: subjectService.createSubject,
    fetchOnMount: false
  })

  const { fetchData: createCategory, loading: categoryLoading } = useAxios({
    service: categoryService.createCategory,
    fetchOnMount: false,
    onResponse: (response) => {
      createSubject({
        name: formValues.subject,
        category: response._id
      })
    }
  })

  const {
    data: formValues,
    errors,
    handleSubmit,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    isDirty
  } = useForm({
    onSubmit,
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const handleSelectChange = (event, category) => {
    if (typeof category === 'string') {
      setExistingCategoryId(null)
      handleNonInputValueChange('category', category)
      return
    }

    const { name = '', _id = null } = category
    handleNonInputValueChange('category', name)
    setExistingCategoryId(_id)
  }

  const hasErrors = Object.values(errors).filter(Boolean).length > 0
  const isSubmitting = categoryLoading || subjectLoading

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
          value={formValues.subject}
        />
      </Box>

      <Box>
        <Typography sx={styles.label}>
          {t('categoriesPage.newSubject.category')}
        </Typography>

        <AsyncAutocomplete
          fetchOnFocus
          freeSolo
          inputValue={formValues.category}
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={handleSelectChange}
          onInputChange={handleSelectChange}
          service={categoryService.getCategoriesNames}
          sx={styles.placeholder}
          textFieldProps={{
            placeholder: t('categoriesPage.newSubject.labels.category'),
            error: Boolean(errors.category),
            helperText: ` ${t(errors.category)}`
          }}
          value={formValues.category}
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
          value={formValues.info}
        />
      </Box>

      <AppButton
        disabled={hasErrors || isSubmitting}
        sx={styles.button}
        type='submit'
      >
        {t('button.sendRequest')}
      </AppButton>
    </Box>
  )
}

export default RequestStudyForm
