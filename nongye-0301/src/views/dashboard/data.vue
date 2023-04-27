<template>
  
  <div>
    <ConTitle :topTitle="topTitle" />
    <GaiLan :deviceObj="deviceObj"></GaiLan>
    <template v-for="(item,index) in  sensorList">

  <el-card class="box-card card_con" v-if="item.length>0"  :key="index">
  <div slot="header" class="clearfix">
    <span>{{ index }}</span>
  </div>
  <ul class="car_ul">
    <li v-for="(ite,ind) in item " :key="ind">
      <div>
        <img src="@/assets/img/write_p.png" alt="" v-if="ite.powerNum<30">
        <img src="@/assets/img/green_p.png" alt="" v-if="ite.powerNum>=30">  
      
      </div>
      <div>{{ ite.devValue }}</div>
      <div>{{ ite.devName }}</div>
      <div>{{ ite.eui }}</div>
    </li>
  </ul>
</el-card>
    </template>


  </div>
</template>

<script>
import GaiLan from '@/components/GaiLan.vue'
import ConTitle from "@/components/ConTitle.vue";
import { $deviceCount, $sensorList} from "@/api";
export default {
    name:'DataPage',
    components:{
      GaiLan,
      ConTitle
    },
    data() {
          return {
              deviceObj: { LoRaWAN: "", LoRaPP: "", group: "", sensor: "" },
              sensorList:{},
              topTitle: {
        type: "", //非首页，该页面的上一级
        text: "设备列表",
        msg: "监控所有设备状态",
      },
          };
      },
      mounted() {
          $deviceCount().then((res) => {
              // console.log(res);
              this.deviceObj = res.data;
          });
          $sensorList().then(
            res=>{
              console.log(res);
              this.sensorList=res.data
            }
          )
        }
}
</script>

<style scoped lang="scss">
       .gailan-l {
          width: 100%;
          display: flex;

          flex-wrap: nowrap;
          justify-content: space-between;
         
      }
      .gailan-l> :first-child {
        width: 180%;
        margin-right: 10px;
        
      }
      .card_con{
        margin-top: 10px;
        .car_ul{
          display: flex;
          flex-wrap: wrap;
          
         li{
           width: 150px;
          height: 100px;
          // background-color: #3ab346;
          margin-right: 8px;
          margin-bottom: 10px;
          border: 1px solid #e3dbdb;
          text-align: center;
          font-size: 13px;
         }
         li>:first-child{
          height: 33px;
          margin-top: 10px;
          img{height: 100%;}
         }
         li>:nth-child(2){
          font-size: 16px;
          font-weight: 800;
         }
         li>:nth-child(3){
          font-size: 15px;
         }
         li>:nth-child(4){
          width: 100%;
          background-color:#f3f4f5;
         }
        }
      }
      
    

</style>