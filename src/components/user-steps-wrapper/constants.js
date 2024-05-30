import { nameField, textField } from '~/utils/validations/common'

export const initialValues = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  professionalSummary: ''
}

export const validations = {
  firstName: nameField,
  lastName: nameField,
  professionalSummary: textField(0, 200)
}

export const subjects = 'subjects'
export const interests = 'interests'

export const tutorStepLabels = ['generalInfo', subjects, 'language', 'photo']
export const studentStepLabels = ['generalInfo', interests, 'language', 'photo']
