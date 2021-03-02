import request from '@/utils/request'

export function clear(query) {
  return request({
    url:'/clearController/clear',
    method:'get',
  })
}
