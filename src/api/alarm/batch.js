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
export function getBatchnumApi(query) {
  return request({
    url:'/result/getBatchnumPage',
    method:'get',
    params: query
  })
}

/**
 * 查询异常总数
 */
export function count() {
  return request({
    url:'/result/count',
    method:'get',
  })
}

/**
 * 查询今日概述列表
 */
export function getOverViewList(query) {
  return request({
    url:'/todayOverView/getOverViewList',
    method:'get',
    params: query
  })
}
