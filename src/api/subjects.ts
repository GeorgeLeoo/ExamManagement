import request from '@/utils/request'
import { ICreateSubjectData, IDeleteParams, ISubjectParams, IUpdateSubjectData } from '@/api/types'
import { subjects } from '@/api/urls'

export const getSubjects = (params: ISubjectParams) =>
  request({
    url: subjects,
    method: 'get',
    params
  })

export const deleteSubject = (params: IDeleteParams) =>
  request({
    url: subjects,
    method: 'delete',
    params
  })

export const createSubject = (data: ICreateSubjectData) =>
  request({
    url: subjects,
    method: 'post',
    data
  })

export const updateSubject = (data: IUpdateSubjectData | {}) =>
  request({
    url: subjects,
    method: 'patch',
    data
  })
