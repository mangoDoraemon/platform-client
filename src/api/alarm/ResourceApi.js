import request from '@/utils/request'

export function getList(query) {
  return request({
    url:'/Resources/getListResources',
    method:'get',
    params: query
  })
}

export function exportExcel() {
  return request({
    url:'/export/export',
    method:'get',
  })
}

export function download() {
  return request({
    url:'/export/download',
    method:'get'
  })
}

export function exportExcel2() {
  return request({
    url:'/export/export-role',
    method:'get',
  })
}

// 下载文件
export function downloadFile(obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = Date.parse(new Date()) + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
