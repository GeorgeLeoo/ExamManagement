import request from '@/utils/request'
import { ICreateNoticeData, IDeleteParams, INoticeParams, IUpdateNoticeData } from '@/api/types'
import { notices } from '@/api/urls'

export const getNotices = (params: INoticeParams) =>
  request({
    url: notices,
    method: 'get',
    params
  })

export const deleteNoticeById = (params: IDeleteParams) =>
  request({
    url: notices,
    method: 'delete',
    params
  })

export const createNotice = (data: ICreateNoticeData) =>
  request({
    url: notices,
    method: 'post',
    data
  })

export const updateNotice = (data: IUpdateNoticeData | {}) =>
  request({
    url: notices,
    method: 'patch',
    data
  })
