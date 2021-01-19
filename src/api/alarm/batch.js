import request from '@/utils/request'

export function getList(query) {
  return request({
    url:'/result/getBatch',
    method:'get',
    params: query
  })
}
