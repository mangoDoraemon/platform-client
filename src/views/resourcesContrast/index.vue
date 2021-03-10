<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="选择日期:">
        <el-date-picker :clearable="clearable"  type="date" value-format="yyyy-MM-dd"  v-model="dateParam.dateTime"  size="small" >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">查找</el-button>
        <el-button type="cyan" icon="el-icon-download" size="mini" @click="dialogVisible=true">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData"  v-loading="loading"
              row-key="id"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              :row-class-name="tableRowClassName">
      <el-table-column prop="dzName" label="模型"></el-table-column>
      <el-table-column prop="allResult" label="1月上报数量"></el-table-column>
      <el-table-column prop="allResult" label="2月上报数量">
      </el-table-column>
      <el-table-column prop="pod1" label="2月新增数量"></el-table-column>
      <el-table-column prop="pod2" label="2月下线数量"></el-table-column>

    </el-table>
    <el-dialog
      title="导出"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>选择模型
      <el-select v-model="selectedArray" @change="changeSelect" multiple>
<!--        <el-option label="全选" key="1" value="全选" @click.native='selectAll'></el-option>-->
        <el-checkbox v-model="checked" @change='selectAll'>全选</el-checkbox>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select></span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
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
        dialogVisible:false,
        options:[{
          value:'2',
          label:'物理机'
        },{
          value:'3',
          label:'虚拟机'
        },{
          value:'4',
          label:'交换机'
        }],
        selectedArray:[],
        checked:false
      }
    },
    created(){
      this.getList();
    },
    methods:{
      // changeSelect(val) {
      //   if (val.includes('全选') && val.length < this.options.length+1) {
      //     if(val.length<=2){
      //       this.selectedArray=[]
      //       this.selectedArray.unshift('全选')
      //     this.options.map((item) => {
      //       this.selectedArray.push(item.value)
      //     })
      //     }else{
      //       this.selectedArray = this.selectedArray.filter((item) => {
      //         return item !== '全选'
      //       })
      //     }
      //
      //   } else if (!val.includes('全选') && val.length == this.options.length) {
      //     this.selectedArray.unshift('全选')
      //   }else{
      //     this.selectedArray = this.selectedArray.filter((item) => {
      //       return item !== '全选'
      //     })
      //   }
      //
      // },
      // selectAll() {
      //   if (this.selectedArray.length < this.options.length) {
      //     this.selectedArray = []
      //     this.options.map((item) => {
      //       this.selectedArray.push(item.value)
      //     })
      //     this.selectedArray.unshift('全选')
      //   } else {
      //     this.selectedArray = []
      //   }
      // },
      // changeSelect(val) {
      //   if (!val.includes('全选') && val.length === this.options.length) {
      //     this.selectedArray.unshift('全选')
      //   } else if (val.includes('全选') && (val.length - 1) < this.options.length) {
      //     this.selectedArray = this.selectedArray.filter((item) => {
      //       return item !== '全选'
      //     })
      //   }
      // },




      selectAll() {
        debugger
        this.selectedArray = []
        if (this.checked) {
          this.options.map((item) => {
            this.selectedArray.push(item.value)
          })
        } else {
          this.selectedArray = []
        }
      },
      changeSelect(val) {
        debugger
        if (val.length === this.options.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      },
      // removeTag(val) {
      //   if (val === '全选') {
      //     this.selectedArray = []
      //   }
      // },


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
      dw(){
        /*download()
*/
         const dateTime = this.dateParam.dateTime
         const url = "http://localhost:9090/export/download"
         console.log(url)
         window.location.href= url
      },
      onDownload(){
        this.display = true;
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
  .el-checkbox {
    text-align: right;
    width: 100%;
    padding-right: 10px;
  }
</style>
