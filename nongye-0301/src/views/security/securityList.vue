<template>
  <div>
    <ConTitle :topTitle="topTitle"></ConTitle>

    <template>
  <el-table
    :data="securitylist"
    style="width: 100%;margin-top: 10px;">
    <el-table-column
      fixed
      type="index"
      label="序号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="标签"
      width="120">
    </el-table-column>
    <el-table-column
      prop="authority"
      label="访问权限"
      width="120">
    </el-table-column>
    <el-table-column
      prop="online"
      label="密钥状态"
      width="120">
      <template slot-scope="scope">
          {{ scope.row.online | fornn }}
        </template>
    </el-table-column>
    <el-table-column
      prop="cTime"
      label="创建时间"
      width="300">
      <template slot-scope="scope">
          {{ scope.row.cTime | formatTime }}
        </template>
    </el-table-column>
    <el-table-column
      prop="uTime"
      label="更新时间"
      width="120">
      <template slot-scope="scope">
          {{ scope.row.uTime | formatTime }}
        </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template>
        <div style="display:flex;justify-content: space-around;">
          <div><el-button type="primary" icon="el-icon-edit" circle></el-button></div>
        <div><el-button type="danger" icon="el-icon-delete" circle></el-button></div>
        </div>
        
      </template>
    </el-table-column>
  </el-table>
</template>

  </div>
</template>

<script>
import ConTitle from '@/components/ConTitle.vue'
import {$securitylist} from '@/api/index.js'
import moment from 'moment'

export default {
    name:'securityAdd',
    components:{
        ConTitle
    },
    data(){
        return{
        topTitle: {
          type: "安全", //非首页，该页面的上一级
          text: "API访问密钥-",
          msg: "使用访问密钥发出http请求",         
        },
        securitylist:[]
      }
    },
    mounted(){
      $securitylist().then(
        (res)=>{
          this.securitylist=res.data
        }
      )
        
      
    },
    filters: {
    //   将事件戳转日期时间
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    fornn(value){
        // let ll=''
        // if(value){
        //     ll="在线"
        // }else{
        //     ll="离线"
        // }
        return value?'使用中':'未使用';
    }
  }
}
</script>

<style>

</style>