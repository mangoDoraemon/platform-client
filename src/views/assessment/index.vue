<template>
  <div class="app-container">
    <el-card>
    <el-row :gutter="140">
      <el-col :span="14">
        <div>
          <el-row slot="header" class="content-box"><span><h4>IT云资源池物理服务器CPU利用率</h4></span></el-row>
          <el-row>
            <el-progress type="circle" :percentage="25" style="padding: 20px"></el-progress>
            <el-progress type="circle" :percentage="35.5" color="#5cb87a" style="padding: 20px;"></el-progress>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <div>
          <el-row slot="header" class="content-box"><span><h4>IT云资源池平台可用性</h4></span></el-row>
          <el-row>
            <el-progress type="circle" :percentage="25"  style="padding: 20px"></el-progress>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row  style="padding: 20px 0px"><span><h4>工单处理质量</h4></span></el-row>
    <el-row>
      <el-table>
        <el-table-column label="工单类型"></el-table-column>
        <el-table-column label="工单数量"></el-table-column>
        <el-table-column label="及时率"></el-table-column>
      </el-table>
    </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>
  .content-box{
  //margin-top: 20px;
    padding: 20px 0px;
    border-bottom: 1px solid #ccc;
  }
  el-progress{
    padding: 20px;
  }
</style>
