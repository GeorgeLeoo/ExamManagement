import request from '@/utils/request'
import { IId, IUpdateScoreParams } from '@/api/types'
import { answers } from '@/api/urls'

export const getAnswers = (params: IId) =>
  request({
    url: answers,
    method: 'get',
    params
  })

export const updateScore = (data: IUpdateScoreParams) =>
  request({
    url: `${answers}/score`,
    method: 'patch',
    data
  })
