import request from '@/utils/request'
import { ICreateOrUpdateTeachersData, IDeleteParams, ITeacherParams } from '@/api/types'
import { teachers } from '@/api/urls'

export const getTeachers = (params: ITeacherParams) =>
  request({
    url: teachers,
    method: 'get',
    params
  })

export const deleteTeachers = (params: IDeleteParams) =>
  request({
    url: teachers,
    method: 'delete',
    params
  })

export const createTeachers = (data: ICreateOrUpdateTeachersData) =>
  request({
    url: teachers,
    method: 'post',
    data
  })

export const updateTeachers = (data: ICreateOrUpdateTeachersData) =>
  request({
    url: teachers,
    method: 'patch',
    data
  })
