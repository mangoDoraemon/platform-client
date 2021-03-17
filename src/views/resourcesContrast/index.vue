<template>
  <div class="app-container">
    <div v-if="detail">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择日期:">
        <el-date-picker
          v-model="compareData.createTime"
          type="month"
          format="yyyyMM"
          value-format="yyyyMM"
          placeholder="选择月">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
        <el-button type="cyan" icon="el-icon-download" size="mini" @click="dialogVisible=true">导出</el-button>

        <el-dialog
          title="导出"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        @close="resetSelect">
      <span>选择模型:
      <el-select v-model="selectedArray" @change="changeSelect" multiple>
<!--        <el-option label="全选" key="1" value="全选" @click.native='selectAll'></el-option>-->
        <el-checkbox v-model="checked" @change='selectAll'>全选</el-checkbox>
        <el-option
          v-for="item in tableData"
          :key="item.modelid"
          :label="item.content"
          :value="item.modelid">
        </el-option>
      </el-select></span>
          <span slot="footer" class="dialog-footer">
    <el-button type="cancel" @click="resetSelect">取 消</el-button>
    <el-button type="primary" @click="download">确 定</el-button>
  </span>
        </el-dialog>
      </el-form-item>
    </el-form>

    <el-table :data="tableData"  v-loading="loading"
              row-key="id"
              >
      <el-table-column prop="content" label="模型"></el-table-column>
      <el-table-column prop="lastmonthSbsl" :label="`${this.lastmonth}月上报数量`"></el-table-column>
      <el-table-column prop="thismonthSbsl" :label="`${this.thismonth}月上报数量`"></el-table-column>
      <el-table-column prop="thismonthAdd" :label="`${this.thismonth}月新增数量`"><template slot-scope="scope"><a @click="changeDetail(scope.row,'新增')" style="color:#1880FF;" v-if="scope.row.thismonthAdd>0">{{scope.row.thismonthAdd}}</a><span v-if="scope.row.thismonthAdd==0">{{scope.row.thismonthAdd}}</span></template></el-table-column>
      <el-table-column prop="thismonthSbsl" :label="`${this.thismonth}月下线数量`"><template slot-scope="scope"><a @click="changeDetail(scope.row,'下线')" style="color:#1880FF;" v-if="scope.row.thismonthXxsl>0">{{scope.row.thismonthXxsl}}</a><span v-if="scope.row.thismonthXxsl==0">{{scope.row.thismonthXxsl}}</span></template></el-table-column>
    </el-table>
    </div>
    <el-tag closable="" v-if="!detail" @close="changeDetail">已选择模型：{{this.compareDetail.content}}</el-tag>
    <el-table v-if="!detail" :data="detailData" v-loading="loading">
      <el-table-column prop="resid" label="资源对象ID"></el-table-column>
      <el-table-column prop="modelid" label="模型ID"></el-table-column>
    </el-table>


  </div>


</template>

<script>
  import {exportExcel,downloadFile} from "@/api/alarm/ResourceApi"
  import {getList,getDetail} from "@/api/alarm/compare"
  import Treeselect from "@riophae/vue-treeselect";
  import moment from "moment";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  export default {
    name: 'index',
    components: { Treeselect },

    data(){
      return{
        compareData:{
          createTime:moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYYMM'),
          modelid:""
        },
        lastmonth:'',
        thismonth:'',
        clearable:false,
        loading:false,
        date_picker:'',
        tableData:[],
        datatime:this.parseTime(new Date()),
        dateParam:{
          dateTime:this.parseTime(new Date(),'{y}{m}'),
          dzBatch:""
        },
        time:'',
        dialogVisible:false,
        // options:[{
        //   value:'2',
        //   label:'物理机'
        // },{
        //   value:'3',
        //   label:'虚拟机'
        // },{
        //   value:'4',
        //   label:'交换机'
        // }],
        selectedArray:[],
        checked:false,
        detail: true,
        detailData:[],
        compareDetail:{
          modelids:[],
          des:"",
          createTime:"",
          content:""
        },
        selected:"",
      }
    },
    created(){
      this.getList();
      //this.getDetail();
    },
    methods:{
      resetSelect(){
        this.dialogVisible = false
        this.selectedArray =[]
        this.checked = false
      },
      download(){
        if(this.selectedArray == ''){
          this.$message({
            message: '请选择资源类型',
            type: 'warning'
          })
        }else {
        const url = "http://localhost:9090/compare/download?createTime="+this.compareData.createTime+"&modelids="+this.selectedArray
        console.log(this.selectedArray)
        console.log(url)
        window.location.href= url
        this.dialogVisible = false
        }
      },
      selectAll() {
        this.selectedArray = []
        if (this.checked) {
          this.tableData.map((item) => {
            this.selectedArray.push(item.modelid)
          })
        } else {
          this.selectedArray = []
        }
      },
      changeSelect(val) {
        if (val.length === this.tableData.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      changeDetail(var1,var2){
        this.loading = true
        this.detail = !this.detail
        this.compareDetail.modelids[0] = var1.modelid
        this.compareDetail.content = var1.content
        this.compareDetail.des = var2
        this.compareDetail.createTime = this.compareData.createTime
        getDetail(this.compareDetail).then((response) =>{
          this.detailData = response.data;
          this.loading = false
        })
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
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
//       dw(){
//         /*download()
// */
//          const dateTime = this.dateParam.dateTime
//          const url = "http://localhost:9090/export/download"
//          console.log(url)
//          window.location.href= url
//       },
//       onDownload(){
//         this.dialogVisible = false
//         console.log(this.selectedArray)
//       },
      getList(){
        this.loading = true;
        getList(this.compareData).then((response) => {
          console.log(this.compareData)
          this.tableData = response.data;
          this.loading=false;
          console.log(response)
        })
        let str = this.compareData.createTime.slice(0, 4) + "-" + this.compareData.createTime.slice(4, 6)
        let date = new Date(str)
        console.log(date)
        this.lastmonth = date.getMonth()
        if(this.lastmonth == 0){
          this.lastmonth = 12
        }
        this.thismonth = date.getMonth()+1

      },
      getDetail(){
        getDetail(this.compareDetail).then((response) =>{
          this.detailData = response.data;
        })
      }
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: #f5dcdd;
  }
  .el-checkbox {
    text-align: right;
    width: 100%;
    padding-right: 10px;
  }
</style>
