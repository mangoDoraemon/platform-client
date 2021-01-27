import request from '@/utils/request'

export function getList(query) {
  return request({
    url:'/Resources/getListResources',
    method:'get',
    params: query
  })
}
