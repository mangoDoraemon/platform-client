import request from '@/utils/request'

export function getList(query) {
  return request({
    url: 'compare/list',
    method: 'get',
    params: query
  })
}

export function getDetail(query) {
  return request({
    url: 'compare/detail',
    method: 'get',
    params: query
  })
}

export function download(query) {
  return request({
    url: 'compare/download',
    method: 'get',
    params: query
  })
}
