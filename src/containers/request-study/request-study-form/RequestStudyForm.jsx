import { useEffect } from 'react'
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
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import {
  initialValues,
  validations,
  MAX_LENGTH
} from '~/containers/request-study/request-study-form/constants'
import { styles } from '~/containers/request-study/request-study-form/RequestStudyForm.styles'

const RequestStudyForm = () => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()

  const { fetchData: fetchSubject } = useAxios({
    service: subjectService.createSubject,
    fetchOnMount: false
  })

  const { fetchData: fetchCategories } = useAxios({
    service: categoryService.createCategory,
    fetchOnMount: false,
    onResponse: (response) => {
      fetchSubject({
        category: response._id,
        name: data.subject
      })
    }
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
      const { subject, category } = data

      if (category._id) {
        fetchSubject({
          name: subject,
          category: category._id
        })

        return
      }

      fetchCategories({
        name: category.name,
        appearance: {
          path: 'mock-path', // temp
          color: '#f9f9f9' // temp
        }
      })
    },
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const handleAutocompleteValueChange = (e, value) => {
    if (typeof value === 'string') {
      handleNonInputValueChange('category', { _id: null, name: value })
      return
    }

    const { _id = null, name = '' } = value
    handleNonInputValueChange('category', { _id, name })
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
          inputValue={data.category.name}
          labelField='name'
          onBlur={handleBlur('category')}
          onChange={handleAutocompleteValueChange}
          onInputChange={handleAutocompleteValueChange}
          service={categoryService.getCategoriesNames}
          sx={styles.placeholder}
          textFieldProps={{
            label: t('becomeTutor.categories.subjectLabel'),
            error: Boolean(errors.category),
            helperText: ` ${t(errors.category)}`
          }}
          value={data.category._id}
          valueField='_id'
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
