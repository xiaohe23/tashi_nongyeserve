<template>
  <div>
    <ConTitle :topTitle="topTitle"></ConTitle>
    <!-- tab栏切换 -->
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="所有设备" name="all">所有设备</el-tab-pane>
      <el-tab-pane label="LoRaWAN" name="LoRaWAN">LoRaWAN</el-tab-pane>
      <el-tab-pane label="LoRaPP" name="LoRaPP">LoRaPP</el-tab-pane>

      <!-- 表单 -->
      <div>
        <el-form ref="form" :model="query" label-width="80px">

          <el-form-item label="在线状态">
        <el-select v-model="query.online" placeholder="请选择状态">
        <el-option label="在线" value=true></el-option>
        <el-option label="离线" value=false></el-option>
        </el-select>
        </el-form-item>

          <el-form-item label="EUI">
          <el-input v-model="query.eui"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button>清除条件</el-button>
          </el-form-item>
          
          <el-form-item>
            <span style="margin-right: 10px;">绑定时间:</span>
            <el-date-picker
              v-model="query.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </el-form-item>

        </el-form>
      </div>
    </el-tabs>

    <el-table :data="gatewayList" style="width: 100% ;margin-top: 10px;" fixed="true">
      <el-table-column type="index" > </el-table-column>
      <el-table-column prop="eui" label="EUI" > </el-table-column>
      <el-table-column prop="name" label="设备名称" > </el-table-column>
      <el-table-column prop="mhz" label="频率(MHz)" > </el-table-column>
      <el-table-column label="在线状态"> 
        <template slot-scope="scope">
          {{ scope.row.online | fornn }}
        </template>
      </el-table-column>
      <el-table-column prop="country" label="国家" > </el-table-column>
      <el-table-column prop="agreement" label="组网协议类型" > </el-table-column>
      <el-table-column label="绑定时间" >
        <template slot-scope="scope">
          {{ scope.row.bTime | formatTime }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.currPage"
      :page-sizes="[2, 4, 5, 10]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
// import moment from 'moment'
import {$gatewayList} from '@/api/index.js'
import ConTitle from '@/components/ConTitle.vue'
import fitermixin from '@/mixins/fitermixin'
import axios from 'axios'
export default {
    name:'gateWay',
    data(){
        return {
      topTitle: {
        type: "设备", //非首页，该页面的上一级
        text: "网关列表",
        msg: "展示EUI、名称、状态等设备信息，可根据EUI、状态，和绑定时问等条件筛选具体的网关。",
      },
      gatewayList:[],
      total: 0, //数据的总条数
      query: {
        currPage: 1, //当前的页码
        pageSize: 5, //当前的每页条数
        eui: "",
        online:"",
        date: [],
        mock:{}
      },
      activeName:'all',
        }
    },
    mounted(){
      this.getData();
      axios.get('/api/user').then(
          res=>{
           this.mock=res
          }
        )
    },
    computed:{
      dateStr() {
      // console.log(666);
      let [d1, d2] = this.query.date;
      // console.log(d1, d2);
      let time1 = d1 && d1.getTime();
      let time2 = d2 && d2.getTime();
      if (time1 && time2) {
        return time1 + "-" + time2;
      } else {
        return "";
      }
    },
    },
    components:{
        ConTitle
    },
    methods:{
    getData() {
      var queryStr = { ...this.query };
        if (queryStr != "") {
       queryStr.date = this.dateStr;
      }
      $gatewayList(queryStr).then((res) => {
        // console.log(res);
        this.gatewayList = res.data;
        this.total = res.total;
      });
    },
    handleSizeChange(value) {
      // console.log("每页显示的条数发生变化了", value);
      this.query.pageSize = value;
      // 当前页需要重置为1
      this.query.currPage = 1;
      // 重新获取数据
      this.getData();
    },
    // 当前的页码
    handleCurrentChange(page) {
      // console.log("当前页被改变了", page);
      this.query.currPage = page;
      // 重新获取数据
      this.getData();
    },
    onSubmit(){
      this.getData()
    }
    },
  // filters: {
  //   //   将事件戳转日期时间
  //   formatTime(value) {
  //     return moment(value).format("YYYY-MM-DD");
  //   },
  //   fornn(value){
      
  //       return value?'在线':'离线';
  //   }
  // },
  mixins:[fitermixin]
}
</script>

<style scoped lang="scs">
    
</style>