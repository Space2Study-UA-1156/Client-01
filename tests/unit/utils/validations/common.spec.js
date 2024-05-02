import {
  helperTextHandler,
  nameField,
  emptyField,
  numberField,
  textField
} from '~/utils/validations/common'

describe('emptyField test', () => {
  it('should be string emptyField', () => {
    expect(emptyField('')).toBe('common.errorMessages.emptyField')
  })
  it('should be string emptyField', () => {
    expect(emptyField('', 'message')).toBe('message')
  })
  it('should be string emptyField', () => {
    expect(emptyField('a', 'message', 'helper message')).toBe('helper message')
  })
})

describe('nameField test', () => {
  it('should be string nameLength', () => {
    expect(nameField('a')).toBe('common.errorMessages.nameLength')
  })
  it('should be string nameAlphabeticOnly', () => {
    expect(nameField('aaa1')).toBe('common.errorMessages.nameAlphabeticOnly')
  })
  it('should be string emptyField', () => {
    expect(nameField('')).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(nameField('Yaroslav')).toBe('')
  })
})

describe('numberField test', () => {
  it('should be string numbersOnly', () => {
    expect(numberField('a1')).toBe('common.errorMessages.numbersOnly')
  })
  it('should be string positiveNumbersOnly', () => {
    expect(numberField('-2')).toBe('common.errorMessages.positiveNumbersOnly')
  })
  it('should be string emptyField', () => {
    expect(numberField('')).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(numberField('123')).toBe('')
  })
})

describe('textField test', () => {
  it('should be string shortText', () => {
    const fn = textField(3, 20)
    expect(fn('a1')).toBe('common.errorMessages.shortText')
  })
  it('should be string longText', () => {
    const fn = textField(3, 5)
    expect(fn('a1dfgd')).toBe('common.errorMessages.longText')
  })
})

describe('helperTextHandler password test', () => {
  it('should be string passwordLength', () => {
    expect(helperTextHandler('aaa1', 'password')).toBe(
      'common.errorMessages.passwordLength'
    )
  })
  it('should be string passwordValid', () => {
    expect(helperTextHandler('aaa', 'password')).toBe(
      'common.errorMessages.passwordValid'
    )
  })
  it('should be string emptyField', () => {
    expect(
      helperTextHandler('', 'password', 'common.errorMessages.emptyField')
    ).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(helperTextHandler('1111111a', 'password')).toBe('')
  })
})

describe('helperTextHandler email test', () => {
  it('should be string emailValid', () => {
    expect(helperTextHandler('email', 'email')).toBe(
      'common.errorMessages.emailValid'
    )
  })
  it('should be string emptyField', () => {
    expect(
      helperTextHandler('', 'email', 'common.errorMessages.emptyField')
    ).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(helperTextHandler('local-part@domain.com', 'email')).toBe('')
  })
})
