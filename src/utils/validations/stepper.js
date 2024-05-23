import { firstName, lastName } from '~/utils/validations/auth'
import { emptyField, textField } from '~/utils/validations/common'

const professionalSummary = (value) => {
  return emptyField(value, '', textField(0, 100)(value) || '')
}

const language = (value) => {
  return emptyField(value, 'common.errorMessages.emptyField', '')
}

export { firstName, lastName, professionalSummary, language }
