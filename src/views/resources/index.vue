<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择日期:">
        <el-date-picker :clearable="clearable"  type="date" value-format="yyyy-MM-dd"  v-model="dateParam.dateTime"  size="small" >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
<!--        <el-button type="cyan" icon="el-icon-search" size="mini" @click="dw">导出</el-button>-->
      </el-form-item>
    </el-form>
    <el-table :data="tableData"  v-loading="loading"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              :row-class-name="tableRowClassName">
      <el-table-column prop="dzBatch" label="上报批次号"></el-table-column>
      <el-table-column prop="dzName" label="对照稽查名称"></el-table-column>
      <el-table-column prop="allResult" label="应报/已报结果">
      </el-table-column>
      <el-table-column prop="pod1" label="浙江省杭州市三墩机房(pod1)"></el-table-column>
      <el-table-column prop="pod2" label="浙江省杭州市石桥机房(pod2)"></el-table-column>
      <el-table-column prop="pod3" label="浙江省杭州市学院路机房(pod3)"></el-table-column>
      <el-table-column prop="pod4" label="浙江省金华市金华机房(pod4)"></el-table-column>
      <el-table-column prop="pod5" label="浙江POD5（池外）"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getList,exportExcel,downloadFile,download} from "@/api/alarm/ResourceApi"
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  export default {
    name: 'index',
    components: { Treeselect },

    data(){
      return{
        clearable:false,
        loading:false,
        date_picker:'',
        tableData:[],
        datatime:this.parseTime(new Date()),
        dateParam:{
          dateTime:this.parseTime(new Date(),'{y}-{m}-{d}'),
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
        this.getList();
      },
      onExport(){

          //this.response = response.getOutput;
          //console.log(response);
          download().then((response) => {
            downloadFile(response,"xxx","xlsx")
          })
          //window.open(response.getOutput);
      },
      dw(){
        /*download()
*/
         const dateTime = this.dateParam.dateTime
         const url = "http://localhost:9090/export/download"
         console.log(url)
         window.location.href= url
      },
      getList(){
        this.loading=true;
       console.log(this.dateParam.dateTime)
        getList(this.dateParam).then((response) => {
          this.tableData = this.handleTree(response.data);
          this.dateParam.dzBatch=this.tableData.dzBatch;
          console.log(this.dateParam.dzBatch)
          this.loading=false;
        }).catch(()=>{
          this.loading=false;
            console.log("跳到登陆界面");
          if(this.dateParam.dateTime>this.parseTime(new Date(),'{y}-{m}-{d}')){
            this.$message({
              message: '请选择正确的时间范围',
              type: 'warning'
            });
          }

        })
      },
      tableRowClassName({row,rowIndex}) {
        if (row.allResult.split("/")[0]!=row.allResult.split("/")[1]) {
          return 'warning-row';
        } else{
          return '';
        }
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: #f5dcdd;
  }
</style>
