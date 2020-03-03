import request from '@/utils/request'
import { IScoreParams } from '@/api/types'

export const getScores = (params: IScoreParams) =>
  request({
    url: '/scores',
    method: 'get',
    params
  })
