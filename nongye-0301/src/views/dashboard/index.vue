<template>
  <div>
      <!-- <el-card class="box-card">
          <span>仪表盘</span>
          <span>-设备概览和传感数据可视化</span>
      </el-card> -->
      <ConTitle :topTitle="topTitle" />
      <!-- 设备概览、监控、公告 -->
      <div class="gailan">
        <GaiLan :deviceObj="deviceObj"></GaiLan>
        <GongGao :topTitle="topTitle"></GongGao>
      </div>
      
      <!-- 图标渲染 -->
      <div class="draw-echart1">
          <el-card class="box-card shidu">
              <div slot="header" class="clearfix">
                  <span>空气湿度</span>
              </div>
              <div class="chart1" ref="chart1"></div>
          </el-card>
          <el-card class="box-card tr">
              <div slot="header" class="clearfix">
                  <span>光照</span>
              </div>
              <div class="chart1" ref="chart2"></div>
          </el-card>
      </div>
      <div class="draw-echart1">
          <el-card class="box-card qiya">
              <div slot="header" class="clearfix">
                  <span>气压</span>
              </div>
              <div class="chart1" ref="chart3"></div>
          </el-card>
          <el-card class="box-card tr">
              <div slot="header" class="clearfix">
                  <span>土壤湿度</span>
              </div>
              <div class="chart1" ref="chart4"></div>
          </el-card>
      </div>
  </div>
</template>

<script>
  import { $deviceCount, $sensorCount } from "@/api";
  import GaiLan from "@/components/GaiLan.vue";
  import GongGao from '../../components/GongGao.vue';
  import ConTitle from "@/components/ConTitle.vue";
  export default {
      name: "IndexView",
      data() {
          return {
              deviceObj: { LoRaWAN: "", LoRaPP: "", group: "", sensor: "" },
              topTitle: {
        type: "", //非首页，该页面的上一级
        text: "仪表盘",
        msg: "设备概览和传感数据可视化",
      },
          };
      },
      mounted() {
          $deviceCount().then((res) => {
              console.log(res);
              this.deviceObj = res.data;
          });
          $sensorCount().then((res) => {
              console.log(res);
              this.draw(res.data);
          });
      },
      components:{
        GaiLan,
        GongGao,
        ConTitle
      },
      methods: {
          draw(data) {
              let chart1 = this.$echarts.init(this.$refs.chart1);
              let chart2 = this.$echarts.init(this.$refs.chart2);
              let chart3 = this.$echarts.init(this.$refs.chart3);
              let chart4 = this.$echarts.init(this.$refs.chart4);
              var option = {
                  xAxis: {
                      type: "category",
                      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  },
                  yAxis: {
                      type: "value",
                  },
                  series: [
                      {
                          data: data.air,
                          type: "line",
                          smooth: true,
                      },
                  ],
              };
              var option1 = {
                  xAxis: {
                      type: "category",
                      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  },
                  yAxis: {
                      type: "value",
                  },
                  series: [
                      {
                          data: data.beam,
                          type: "bar",
                      },
                  ],
              };
              var option2 = {
                  legend: {
                      top: "bottom",
                  },
                  toolbox: {
                      show: true,
                      feature: {
                          mark: { show: true },
                          dataView: { show: true, readOnly: false },
                          restore: { show: true },
                          saveAsImage: { show: true },
                      },
                  },
                  series: [
                      {
                          name: "Nightingale Chart",
                          type: "pie",
                          radius: [15, 120],
                          center: ["50%", "50%"],
                          roseType: "area",
                          itemStyle: {
                              borderRadius: 8,
                          },
                          data: data.pressure,
                      },
                  ],
              };
              var option3 = {
                  xAxis: {
                      type: "category",
                      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  },
                  yAxis: {
                      type: "value",
                  },
                  series: [
                      {
                          data: data.soil,
                          type: "line",
                          smooth: true,
                      },
                  ],
              };
              console.log(chart1, option);
              chart1.setOption(option);
              chart2.setOption(option1);
              chart3.setOption(option2);
              chart4.setOption(option3);
          },
      },
  };
</script>

<style lang="scss" scoped>
  .draw-echart1 {
      display: flex;
      margin-top: 20px;

      .chart1 {
          height: 300px;
      }

      .tr {
          margin-left: 10px;
      }
  }

  .text {
      font-size: 14px;
  }

  .item {
      margin-bottom: 18px;
  }

  .box-card {
      width: 100%;
  }

  .gailan {
      //   width: 100%;
      margin-top: 10px;
      display: flex;
      height: 245px;

      .gailan-l {
          width: 80%;
          display: flex;

          flex-wrap: nowrap;
      }

      .jiankong {
          width: 35%;
          margin-left: 10px;
      }

      .gailan-r {
          width: 20%;
          margin-left: 10px;

          .gonggao {
              height: 245px;
          }
      }
  }

  .con-title {
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      height: 85px;
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      font-weight: bold;

      .gateway img {
          width: 51px;
          height: 94px;
          margin-top: -15px;
      }

      .node2 img {
          width: 20px;
          height: 50px;
          margin-top: 15px;
      }

      .jiedian {
          width: 90px;
          height: 65px;
      }

      .qunzu {
          width: 59px;
          height: 85px;
      }

      .LoRaPP {
          width: 74px;
          height: 85px;
      }

      .LoRaWAN {
          width: 88px;
      }
  }

  .zu {
      margin-top: 18px;
  }

  .con-text {
      font-size: 35px;
  }

  .lixian {
      display: flex;
      justify-content: space-around;
      flex-direction: column;

      .key1 {
          height: 40px;
          font-size: 14px;
          font-weight: bold;
          position: relative;

          span {
              display: inline-block;
              width: 50px;
              height: 20px;
              border-radius: 10px;
              line-height: 20px;
              text-align: center;
              background: #ddf0e0;
              position: absolute;
              right: 0;
              color: #6aa27d;
          }

          .pink {
              background: #fbdadb;

              color: #ed5c65;
          }
      }
  }
</style>