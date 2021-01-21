import request from '@/utils/request'

export function find() {
  return request({
    url:'/index/find',
    method:'get',
  })
}

export function findByDate(query) {
  return request({
    url:'/index/findByDate'+'?dateParam='+query,
    method:'get'
  })
}
