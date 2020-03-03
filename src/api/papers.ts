import request from '@/utils/request'
import { IPaperParams } from '@/api/types'

export const getPapers = (params: IPaperParams) =>
  request({
    url: '/papers',
    method: 'get',
    params
  })
