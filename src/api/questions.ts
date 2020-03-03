import request from '@/utils/request'
import { IQuestionParams } from '@/api/types'

export const getSingles = (params: IQuestionParams) =>
  request({
    url: '/singles',
    method: 'get',
    params
  })

export const getMultiples = (params: IQuestionParams) =>
  request({
    url: '/multiples',
    method: 'get',
    params
  })

export const getJudges = (params: IQuestionParams) =>
  request({
    url: '/judges',
    method: 'get',
    params
  })

export const getCompletions = (params: IQuestionParams) =>
  request({
    url: '/completions',
    method: 'get',
    params
  })

export const getAFQs = (params: IQuestionParams) =>
  request({
    url: '/afq',
    method: 'get',
    params
  })
