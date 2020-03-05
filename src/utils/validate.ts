export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * 是否为空
 * @param params
 */
export const isEmpty = (params: string | undefined) => {
  return !params || params.length === 0
}

export const isValidNo = (params: string) => {
  return !isEmpty(params)
}

export const isValidName = (params: string) => {
  return !isEmpty(params)
}

export const isValidEmail = (params: string) => {
  const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return !isEmpty(params) && reg.test(params)
}

export const isValidPhone = (params: string) => {
  const reg = /^1[3456789]\d{9}$/
  return !isEmpty(params) && reg.test(params)
}

export const isValidGender = (gender: number) => {
  return typeof gender !== 'undefined' && gender !== -1
}

export const isValidNotice = (params: string) => {
  return !isEmpty(params)
}

export const isValidSubject = (params: string) => {
  return !isEmpty(params)
}

export const isValidSubjectDesc = (params: string) => {
  return !isEmpty(params)
}
