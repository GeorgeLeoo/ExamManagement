import request from '@/utils/request'
import {
  ICreateTeachersData,
  IDeleteParams,
  ITeacherParams,
  IUpdateTeacherData,
  IUpdateTeacherStatusData
} from '@/api/types'
import { teachers } from '@/api/urls'

export const getTeachers = (params: ITeacherParams) =>
  request({
    url: '/admin/infos',
    method: 'get',
    params
  })

export const getAllTeachers = () =>
  request({
    url: `/admin/all`,
    method: 'get'
  })

export const deleteTeachers = (params: IDeleteParams) =>
  request({
    url: teachers,
    method: 'delete',
    params
  })

export const createTeachers = (data: ICreateTeachersData) =>
  request({
    url: '/admin/info',
    method: 'post',
    data
  })

export const updateTeacher = (data: IUpdateTeacherData | {}) =>
  request({
    url: '/admin/info',
    method: 'patch',
    data
  })

export const updateTeacherStatus = (data: IUpdateTeacherStatusData) =>
  request({
    url: `/admin/status`,
    method: 'put',
    data
  })
