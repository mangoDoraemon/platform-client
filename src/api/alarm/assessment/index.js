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
export function getAunchedApi() {
  return request({
    url:'/index/getAunched',
    method:'get',
  })
}

/**
 * 已分配
 */
export function getAllocatedApi() {
  return request({
    url:'/index/getAllocated',
    method:'get',
  })
}

/**
 *统计云纳管各部分上报异常数
 */
export function getCountApi() {
  return request({
    url:'/index/getCount',
    method:'get'
  })
}
