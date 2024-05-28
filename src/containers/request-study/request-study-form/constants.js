import { textField, emptyField } from '~/utils/validations/common'

export const MAX_LENGTH = 1000

export const validations = {
  subject: (value) => emptyField(value),
  category: (value) => emptyField(value.name),
  info: (value) =>
    emptyField(
      value,
      'common.errorMessages.emptyField',
      textField(20, MAX_LENGTH)(value)
    )
}

export const initialValues = {
  subject: '',
  category: {
    _id: null,
    name: ''
  },
  info: ''
}
