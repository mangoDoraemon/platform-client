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
export function getBatchnum(query) {
  return request({
    url:'/result/getBatchnum',
    method:'get',
    params: query
  })
}
export function count(query) {
  return request({
    url:'/result/count',
    method:'get',
    params: query
  })
}

