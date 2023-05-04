<template>
  <div>
    <ConTitle :topTitle="topTitle"></ConTitle>

    <el-card class="box-card gonggao">
        <div slot="header" class="clearfix">
            <span style="font-size: 13px;"><i class="el-icon-info"></i>设备概览</span>
        </div>
            
    <el-form label-position="left" label-width="80px" :model="fee">
  <el-form-item label="账户余额">
    <span>￥{{ balance.balance }}</span>
  </el-form-item>
  <el-form-item label="充值金额">
    <el-input v-model="fee.amount" style="width: 300px;"></el-input>
  </el-form-item>
  <el-form-item label="备注" >
    <el-input v-model="fee.desc" style="width: 300px;"></el-input>
  </el-form-item>
  <el-form-item label="" >
    <el-button type="primary" @click="onsub">充值</el-button>
  </el-form-item>
</el-form>

    </el-card>

  </div>
</template>

<script>
import ConTitle from '@/components/ConTitle.vue'
import {$balance,$recharge} from '@/api/index.js'

export default {
    name:'feeBalance',
   data(){
    return{
        topTitle: {
          type: "计费", //非首页，该页面的上一级
          text: "账户信息-",
          msg: "展示当前账户的剩余消息额度，可更具兑换码兑换信息额度",         
        },
        fee:{
            amount:"",type:"recharge",desc:""
        },
        balance:{},
        feemo:''
    }
   },
   components:{
    ConTitle
   },
   mounted(){
    this.getData()
   },
   methods:{
    getData() {
      $balance().then((res) => {
        // console.log(res);
        this.balance = res.data;
        this.total = res.total;
      });
    },
    onsub(){
    $recharge(
        {amount:this.fee.amount,type:"recharge",desc:this.fee.desc})
        .then(
        ()=>{
          this.$message({
          message: '恭喜充值成功',
          type: 'success'
        });
        this.fee.amount=''
        this.fee.desc=''
        this.getData()
        }
    )

    }
   }

}
</script>

<style>

</style>