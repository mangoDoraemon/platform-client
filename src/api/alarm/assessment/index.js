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

/**
 * 已上线
 */
export function getAunched() {
  return request({
    url:'/index/getAunched',
    method:'get',
  })
}

/**
 * 已分配
 */
export function getAllocated() {
  return request({
    url:'/index/getAllocated',
    method:'get',
  })
}