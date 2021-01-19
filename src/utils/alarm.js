/**
 * 通用js方法封装处理
 */

const baseURL = process.env.VUE_APP_BASE_API



// 表单重置
  export function resetForm(refName) {
    if (this.$refs[refName]) {
      this.$refs[refName].resetFields();
    }
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








