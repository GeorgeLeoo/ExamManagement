import request from '@/utils/request'
import { ITeacherParams } from '@/api/types'

export const getTeachers = (params: ITeacherParams) =>
  request({
    url: '/teachers',
    method: 'get',
    params
  })
