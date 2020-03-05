import request from '@/utils/request'
import { IScoreParams } from '@/api/types'
import { scores } from '@/api/urls'

export const getScores = (params: IScoreParams) =>
  request({
    url: scores,
    method: 'get',
    params
  })

export const getAllScores = () =>
  request({
    url: `${scores}/all`,
    method: 'get'
  })
