<template>
  <div class="app-container">
    <el-form :inline="true"  class="demo-form-inline" >
      <el-form-item label="选择日期：">
        <el-date-picker
          :clearable="clearable"
          v-model="datatime"
          type="date"
          placeholder="选择日期" size="small"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <span style="font-family: 微软雅黑;font-size: large;font-weight: 500;line-height: 50px" >告警报表</span>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"

    >
      <el-table-column
        prop="type"
        label="告警类型"
        align="center"
      >
        <template slot-scope="scope">{{scope.row.type=="add"?"告警" :"取消告警"}} </template>
      </el-table-column>
      <el-table-column
        prop="count"
        label="总条数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="success"
        label="已上报"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fail"
        label="未上报"
        align="center">
        <template slot-scope="scope">{{scope.row.fail}} </template>
      </el-table-column>
      <el-table-column  label="未上报原因"
                        align="center"
                        prop="fail"
                        v-if="showOne"
      >
        <template slot-scope="scope">
          {{ scope.row.fail>0?'API接口故障': ""}}
        </template>
      </el-table-column>
</el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList1"
    />
  </div>
</template>

<script>
  import {getList} from "@/api/alarm/alarmApi";
  export default {
    name: 'index',
    data() {
      return {
          clearable:false,
          loading:false,
        dateRange:'',
        datatime:new Date(),
        tableData: [{
        type: '',
        count: '',
        success: '',
        fail: '',
        }],
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          uploadTime:''
        },
        case:true,
        total:0,
        look:"",
        showOne:true,
      }
    },
    created(){
      this.getList1();
    },
    methods: {
      onSubmit() {
        let that=this;
        that.queryParams.uploadTime=that.datatime;
        that.getList1();
      },
      /**
       * 查询告警列表
       */
      getList1() {
        this.loading = true;
        var time=this.parseTime(this.datatime);
        if(time!=null){
          this.queryParams.uploadTime=this.parseTime(time).substring(0, (time).indexOf(" "));
        }
        getList(this.addDateRange(this.queryParams,this.dateRange)).then((response) => {
          this.tableData = response.data;
          this.loading = false;
        }).catch(()=>{
          this.loading = false;
        })

      },

    }
  }
</script>

<style scoped>

</style>
