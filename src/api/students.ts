import request from '@/utils/request'
import {
  ICreateStudentsData,
  IDeleteParams,
  IStudentParams,
  IUpdateStudentStatusData,
  IUpdateTeacherData
} from '@/api/types'
import { students } from '@/api/urls'

export const getStudents = (params: IStudentParams) =>
  request({
    url: students,
    method: 'get',
    params
  })

export const getAllStudents = () =>
  request({
    url: `${students}/all`,
    method: 'get'
  })

export const deleteStudents = (params: IDeleteParams) =>
  request({
    url: students,
    method: 'delete',
    params
  })

export const createStudents = (data: ICreateStudentsData) =>
  request({
    url: students,
    method: 'post',
    data
  })

export const updateStudent = (data: IUpdateTeacherData | {}) =>
  request({
    url: students,
    method: 'patch',
    data
  })

export const updateStudentStatus = (data: IUpdateStudentStatusData) =>
  request({
    url: `${students}/status`,
    method: 'put',
    data
  })
