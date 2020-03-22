import { isValidUsername, isExternal, isValidSubject, isValidPhone } from '@/utils/validate'

describe('Utils:validate', () => {
  it('isValidUsername', () => {
    expect(isValidUsername('admin')).toBe(true)
    expect(isValidUsername('editor')).toBe(true)
    expect(isValidUsername('xxxx')).toBe(false)
  })

  it('isExternal', () => {
    expect(isExternal('https://www.armour.com/')).toBe(true)
    expect(isExternal('mailto:someone@test.com')).toBe(true)
    expect(isExternal('123aBC')).toBe(false)
  })

  it('isValidPhone', () => {
    expect(isValidPhone('18921483103')).toBe(true)
    expect(isValidPhone('12345678900')).toBe(false)
    expect(isValidPhone('01293333494')).toBe(false)
    expect(isValidPhone('')).toBe(false)
  })
})
