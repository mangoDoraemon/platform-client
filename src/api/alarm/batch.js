import request from '@/utils/request'

export function getList(query) {
  return request({
    url:'/result/getBatch',
    method:'get',
    params: query
  })
}
export function getListBybatchnum(query) {
  return request({
    url:'/result/list',
    method:'get',
    params: query
  })
}

