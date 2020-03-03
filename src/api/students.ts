import request from '@/utils/request'
import { IStudentParams } from '@/api/types'

export const getStudents = (params: IStudentParams) =>
  request({
    url: '/students',
    method: 'get',
    params
  })
