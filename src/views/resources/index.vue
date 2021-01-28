<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择日期:">
        <el-date-picker type="date" value-format="yyyy-MM-dd"  v-model="dateParam.dateTime"  size="small" @change="getList">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="对照批次号:" label-width="100px">
        <el-input v-model="dateParam.dzBatch" placeholder="请输入对照批次号" size="small" ></el-input>
      </el-form-item>
      <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
    </el-form>
    <el-table :data="tableData"  v-loading="loading">
      <el-table-column prop="dzBatch" label="对照批次号"></el-table-column>
      <el-table-column prop="dzName" label="对照稽查名称"></el-table-column>
      <el-table-column prop="czResult" label="参照结果"></el-table-column>
      <el-table-column prop="dzResult" label="对照结果"></el-table-column>
      <el-table-column prop="pod1" label="浙江省杭州市三墩机房(pod1)"></el-table-column>
      <el-table-column prop="pod2" label="浙江省杭州市石桥机房(pod2)"></el-table-column>
      <el-table-column prop="pod3" label="浙江省杭州市学院路机房(pod3)"></el-table-column>
      <el-table-column prop="pod4" label="浙江省金华市金华机房(pod4)"></el-table-column>
      <el-table-column prop="pod5" label="浙江POD5（池外）"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getList} from "@/api/alarm/ResourceApi"
  export default {
    name: 'index',
    data(){
      return{
        loading:false,
        date_picker:'',
        tableData:[],
        datatime:new Date(),
        dateParam:{
          dateTime:new Date(),
          dzBatch:""
        },
        time:'',

      }
    },
    created(){
      this.getList();
    },
    methods:{
      onSubmit(){

      },
      getList(){
        this.loading=true;
       /* console.log("时间"+this.dateParam.dataTime)
        var toTime=this.parseTime(this.dateParam.dataTime);
        if(this.dateParam.dataTime!=null){
          this.dateParam.dataTime=toTime.substring(0,10);
          console.log("传参时间"+this.dateParam.dataTime)
        }*/
       /* var time=this.dateParam.dataTime;
        if(time!=null){
          this.dateParam.dataTime=time;
          console.log("传参时间"+this.dateParam.dataTime)
        }*/
       console.log(this.dateParam.dateTime)
        debugger
        getList(this.dateParam).then((response) => {
          debugger
          this.tableData = response.data;
          this.dateParam.dzBatch=this.tableData.dzBatch;
          console.log(this.dateParam.dzBatch)
          this.loading=false;
        }).catch(()=>{
          this.loading=false;
        })
      }
    }
  }
</script>

<style scoped>

</style>
