import request from '@/utils/request'

export function find() {
  return request({
    url:'/index/find',
    method:'get',
  })
}
