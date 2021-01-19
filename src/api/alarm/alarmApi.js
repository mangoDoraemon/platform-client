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
// 添加日期范围
export function addDateRange(params, dateRange) {
  var search = params;
  search.beginTime = "";
  search.endTime = "";
  if (null != dateRange && '' != dateRange) {
    search.beginTime = this.dateRange[0];
    search.endTime = this.dateRange[1];
  }
  return search;
}
