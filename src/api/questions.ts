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
import { afq, completions, judges, multiples, questionBank, singles } from '@/api/urls'

export const getSingles = (params: IQuestionParams) =>
  request({
    url: questionBank + singles,
    method: 'get',
    params
  })

export const createSingle = (data: ISingleMultipleParams) =>
  request({
    url: questionBank + singles,
    method: 'post',
    data
  })

export const updateSingle = (data: ISingleMultipleData) =>
  request({
    url: questionBank + singles,
    method: 'patch',
    data
  })

export const deleteSingle = (params: IDeleteParams) =>
  request({
    url: questionBank + singles,
    method: 'delete',
    params
  })

export const getMultiples = (params: IQuestionParams) =>
  request({
    url: questionBank + multiples,
    method: 'get',
    params
  })

export const createMultiple = (data: ISingleMultipleParams) =>
  request({
    url: questionBank + multiples,
    method: 'post',
    data
  })

export const updateMultiple = (data: ISingleMultipleData) =>
  request({
    url: questionBank + multiples,
    method: 'patch',
    data
  })

export const deleteMultiple = (params: IDeleteParams) =>
  request({
    url: questionBank + multiples,
    method: 'delete',
    params
  })

export const getJudges = (params: IQuestionParams) =>
  request({
    url: questionBank + judges,
    method: 'get',
    params
  })

export const createJudge = (data: IJudgeParams) =>
  request({
    url: questionBank + judges,
    method: 'post',
    data
  })

export const updateJudge = (data: IJudgeData) =>
  request({
    url: questionBank + judges,
    method: 'patch',
    data
  })

export const deleteJudge = (params: IDeleteParams) =>
  request({
    url: questionBank + judges,
    method: 'delete',
    params
  })

export const getCompletions = (params: IQuestionParams) =>
  request({
    url: questionBank + completions,
    method: 'get',
    params
  })

export const createCompletion = (data: ICompletionAFQParams) =>
  request({
    url: questionBank + completions,
    method: 'post',
    data
  })

export const updateCompletion = (data: ICompletionAFQData) =>
  request({
    url: questionBank + completions,
    method: 'patch',
    data
  })

export const deleteCompletion = (params: IDeleteParams) =>
  request({
    url: questionBank + completions,
    method: 'delete',
    params
  })

export const getAFQs = (params: IQuestionParams) =>
  request({
    url: questionBank + afq,
    method: 'get',
    params
  })

export const createAFQ = (data: ICompletionAFQParams) =>
  request({
    url: questionBank + afq,
    method: 'post',
    data
  })

export const updateAFQ = (data: ICompletionAFQData) =>
  request({
    url: questionBank + afq,
    method: 'patch',
    data
  })

export const deleteAFQ = (params: IDeleteParams) =>
  request({
    url: questionBank + afq,
    method: 'delete',
    params
  })
