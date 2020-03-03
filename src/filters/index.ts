// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const genderStatusFilter = (status: number) => {
  const statusMap: {[key: number]: string} = {
    0: '男',
    1: '女'
  }
  return statusMap[status]
}

export const paperTypeFilter = (type: number) => {
  const statusMap: {[key: number]: string} = {
    0: '随机组卷',
    1: '固定组卷'
  }
  return statusMap[type]
}

export const testTypeFilter = (type: number) => {
  const statusMap: {[key: number]: string} = {
    0: '模拟考试',
    1: '正式考试'
  }
  return statusMap[type]
}

export const trueOrFalseFilter = (type: number) => {
  const statusMap: {[key: number]: string} = {
    0: '正确',
    1: '错误'
  }
  return statusMap[type]
}
