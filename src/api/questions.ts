import request from '@/utils/request'
import {
  ICompletionAFQData,
  ICompletionAFQParams,
  IDeleteParams,
  IJudgeData,
  IJudgeParams,
  IQuestionParams,
  ISingleMultipleData,
  ISingleMultipleParams
} from '@/api/types'
import { afq, completions, judges, multiples, singles } from '@/api/urls'

export const getSingles = (params: IQuestionParams) =>
  request({
    url: singles,
    method: 'get',
    params
  })

export const createSingle = (data: ISingleMultipleParams) =>
  request({
    url: singles,
    method: 'post',
    data
  })

export const updateSingle = (data: ISingleMultipleData) =>
  request({
    url: singles,
    method: 'post',
    data
  })

export const deleteSingle = (params: IDeleteParams) =>
  request({
    url: singles,
    method: 'delete',
    params
  })

export const getMultiples = (params: IQuestionParams) =>
  request({
    url: multiples,
    method: 'get',
    params
  })

export const createMultiple = (data: ISingleMultipleParams) =>
  request({
    url: multiples,
    method: 'post',
    data
  })

export const updateMultiple = (data: ISingleMultipleData) =>
  request({
    url: multiples,
    method: 'post',
    data
  })

export const deleteMultiple = (params: IDeleteParams) =>
  request({
    url: multiples,
    method: 'delete',
    params
  })

export const getJudges = (params: IQuestionParams) =>
  request({
    url: judges,
    method: 'get',
    params
  })

export const createJudge = (data: IJudgeParams) =>
  request({
    url: judges,
    method: 'post',
    data
  })

export const updateJudge = (data: IJudgeData) =>
  request({
    url: judges,
    method: 'post',
    data
  })

export const deleteJudge = (params: IDeleteParams) =>
  request({
    url: multiples,
    method: 'delete',
    params
  })

export const getCompletions = (params: IQuestionParams) =>
  request({
    url: completions,
    method: 'get',
    params
  })

export const createCompletion = (data: ICompletionAFQParams) =>
  request({
    url: completions,
    method: 'post',
    data
  })

export const updateCompletion = (data: ICompletionAFQData) =>
  request({
    url: completions,
    method: 'post',
    data
  })

export const deleteCompletion = (params: IDeleteParams) =>
  request({
    url: completions,
    method: 'delete',
    params
  })

export const getAFQs = (params: IQuestionParams) =>
  request({
    url: afq,
    method: 'get',
    params
  })

export const createAFQ = (data: ICompletionAFQParams) =>
  request({
    url: afq,
    method: 'post',
    data
  })

export const updateAFQ = (data: ICompletionAFQData) =>
  request({
    url: afq,
    method: 'post',
    data
  })

export const deleteAFQ = (params: IDeleteParams) =>
  request({
    url: afq,
    method: 'delete',
    params
  })
