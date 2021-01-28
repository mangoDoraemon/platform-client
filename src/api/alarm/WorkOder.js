import request from '@/utils/request'

export function getList(query) {
  return request({
    url:'/WorkOderController/getWorklist',
    method:'get',
    params: query
  })
}
export function getCount(query) {
  return request({
    url:'/WorkOderController/getCount',
    method:'get',
    params: query
  })
}
export function getCountBygdType(query) {
  return request({
    url:'/WorkOderController/getCountBygdType',
    method:'get',
    params: query
  })
}
