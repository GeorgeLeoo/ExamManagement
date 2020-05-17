import request from '@/utils/request'
import {IDeleteParams, IId, IKnowledgePointParams, IPaperParams} from '@/api/types'
import { papers } from '@/api/urls'

export const getPapers = (params: IPaperParams) =>
  request({
    url: papers,
    method: 'get',
    params
  })

export const createPapers = (data: any) =>
  request({
    url: papers,
    method: 'post',
    data
  })

export const updatePapers = (data: any) =>
  request({
    url: papers,
    method: 'patch',
    data
  })

export const getPaperQuestions = (params: IId) =>
  request({
    url: `${papers}/questions`,
    method: 'get',
    params
  })

export const deletePaper = (params: IDeleteParams) =>
  request({
    url: papers,
    method: 'delete',
    params
  })

export const getKnowledgePoints = (params: IKnowledgePointParams) =>
  request({
    url: '/papers/knowledge-points',
    method: 'get',
    params
  })
