// Set utils function parseTime to filter
import {
  createAFQ,
  createCompletion,
  createJudge,
  createMultiple,
  createSingle,
  updateAFQ,
  updateCompletion,
  updateJudge,
  updateMultiple,
  updateSingle
} from '@/api/questions'

export {parseTime} from '@/utils'

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
  const statusMap: { [key: number]: string } = {
    0: '男',
    1: '女'
  }
  return statusMap[status]
}

export const paperTypeFilter = (type: number) => {
  const statusMap: { [key: number]: string } = {
    0: '固定组卷',
    1: '随机组卷'
  }
  return statusMap[type]
}

export const testTypeFilter = (type: number) => {
  const statusMap: { [key: number]: string } = {
    0: '模拟考试',
    1: '正式考试'
  }
  return statusMap[type]
}

export const trueOrFalseFilter = (type: number) => {
  const statusMap: { [key: number]: string } = {
    0: '正确',
    1: '错误'
  }
  return statusMap[type]
}

export const paperStatusFilter = (status: number) => {
  const statusMap: { [key: number]: string } = {
    0: '已批改',
    1: '未批改'
  }
  return statusMap[status]
}

export const questionFilter = (dialogType: number, bankType: number) => {
  const questionMap: { [key: number]: Function }[] = [
    {
      0: createSingle,
      1: createMultiple,
      2: createJudge,
      3: createCompletion,
      4: createAFQ
    },
    {
      0: updateSingle,
      1: updateMultiple,
      2: updateJudge,
      3: updateCompletion,
      4: updateAFQ
    }
  ]
  return questionMap[dialogType][bankType]
}

/**
 * 计算时间差
 * @param item
 */
export const getDurationTime = (item: any) => {
  const diffTime = (new Date(item.endTime).getTime() - new Date(item.startTime).getTime()) / 1000 // 计算时间差,并把毫秒转换成秒
  const days = parseInt(diffTime / 86400 + '') // 天  24*60*60*1000
  const hours = parseInt(diffTime / 3600 + '') - 24 * days // 小时 60*60 总小时数-过去的小时数=现在的小时数
  const minutes = parseInt(diffTime % 3600 / 60 + '') // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
  const seconds = parseInt(diffTime % 60 + '') // 以60秒为一整份 取余 剩下秒数
  return (hours > 10 ? hours : ('0' + hours)) + ':' + (minutes > 10 ? minutes : ('0' + minutes)) + ':' + (seconds > 10 ? seconds : ('0' + seconds))
}
/**
 * 计算试卷总分
 * @param item
 */
export const paperTotalScore = (item: any) => {
  let totalScore = 0
  if (item.paperType === 0) {
    totalScore = item.singleScore * item.single.length +
      item.multipleScore * item.multiple.length +
      item.judgeScore * item.judge.length +
      item.completionScore * item.completion.length +
      item.afqScore * item.afq.length
  }
  if (item.paperType === 1) {
    totalScore = item.singleScore * item.singleNumber +
      item.multipleScore * item.multipleNumber +
      item.judgeScore * item.judgeNumber +
      item.completionScore * item.completionNumber +
      item.afqScore * item.afqNumber
  }
  return totalScore
}
