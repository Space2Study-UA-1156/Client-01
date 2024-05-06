import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password
} from '~/utils/validations/auth'

describe('auth firstName validation', () => {
  it('should be string nameLength', () => {
    expect(firstName('a')).toBe('common.errorMessages.nameLength')
  })
  it('should be string nameAlphabeticOnly', () => {
    expect(firstName('aaa1')).toBe('common.errorMessages.nameAlphabeticOnly')
  })
  it('should be string emptyField', () => {
    expect(firstName('')).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(firstName('Yaroslav')).toBe('')
  })
})

describe('auth lastName validation', () => {
  it('should be string nameLength', () => {
    expect(lastName('a')).toBe('common.errorMessages.nameLength')
  })
  it('should be string nameAlphabeticOnly', () => {
    expect(lastName('aaa1')).toBe('common.errorMessages.nameAlphabeticOnly')
  })
  it('should be string emptyField', () => {
    expect(lastName('')).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(lastName('Yaroslav')).toBe('')
  })
})

describe('auth email validation', () => {
  it('should be string emailValid', () => {
    expect(email('email')).toBe('common.errorMessages.emailValid')
  })
  it('should be string emptyField', () => {
    expect(email('')).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(email('local-part@domain.com')).toBe('')
  })
})

describe('auth password validation', () => {
  it('should be string passwordLength', () => {
    expect(password('aaa1')).toBe('common.errorMessages.passwordLength')
  })
  it('should be string passwordValid', () => {
    expect(password('aaa')).toBe('common.errorMessages.passwordValid')
  })
  it('should be string emptyField', () => {
    expect(password('')).toBe('common.errorMessages.emptyField')
  })
  it('should not be any errors', () => {
    expect(password('1111111a')).toBe('')
  })
})

describe('auth confirmPassword validation', () => {
  it('should be string passwordValid', () => {
    expect(confirmPassword('1111111a', { password: 'aaa12' })).toBe(
      'common.errorMessages.passwordsDontMatch'
    )
  })
  it('should be string emptyField', () => {
    expect(confirmPassword('', { password: '' })).toBe(
      'common.errorMessages.emptyField'
    )
  })
  it('should not be any errors', () => {
    expect(confirmPassword('1111111a', { password: '1111111a' })).toBe('')
  })
})
