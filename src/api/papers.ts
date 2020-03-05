import request from '@/utils/request'
import { IDeleteParams, IPaperParams } from '@/api/types'
import { papers } from '@/api/urls'

export const getPapers = (params: IPaperParams) =>
  request({
    url: papers,
    method: 'get',
    params
  })

export const deletePaper = (params: IDeleteParams) =>
  request({
    url: papers,
    method: 'delete',
    params
  })
