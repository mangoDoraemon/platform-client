import request from '@/utils/request'

export function getList(query) {
  return request({
    url:'/performance/getPerformance',
    method:'get',
    params: query
  })
}

export function getListByTime(uploadtime) {
  return request({
    url:'/performance/getPerformanceBytime/'+uploadtime,
    method: 'get'
  })

}

