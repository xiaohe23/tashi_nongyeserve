<template>
   
          <div class="gailan-l">
              <!-- 设备概览 -->
              <el-card class="box-card shebei">
                  <div slot="header" class="clearfix">
                      <span>设备概览</span>
                      <el-button style="float: right; padding: 3px 0" type="text">绑定设备</el-button>
                  </div>
                  <div class="con-title">
                      <div class="gateway">
                          <img src="@/assets/img/gateway.png" alt="" />
                      </div>
                      <span style="width: 2px; height: 65px; background: #e9eef6"></span>
                      <div class="LoRaWAN">
                          <div class="con-text">{{ deviceObj.LoRaWAN.total }}</div>
                          <div>LoRaWAN</div>
                          <div>网关</div>
                      </div>
                      <span style="width: 2px; height: 65px; background: #e9eef6"></span>
                      <div class="LoRaPP">
                          <div class="con-text">{{ deviceObj.LoRaPP.total }}</div>
                          <div>LoRaPP</div>
                          <div>网关</div>
                      </div>
                      <span style="width: 2px; height: 65px; background: #e9eef6"></span>
                      <div class="qunzu">
                          <div class="con-text">{{ deviceObj.group }}</div>

                          <div class="zu">群组</div>
                      </div>
                      <span style="width: 2px; height: 107px; background: #e9eef6"></span>
                      <div class="node2">
                          <img src="@/assets/img/devNode2.png" alt="" />
                      </div>
                      <div class="jiedian">
                          <div class="con-text">{{ deviceObj.sensor.total }}</div>
                          <div class="zu">传感器节点</div>
                      </div>
                  </div>
              </el-card>
              <el-card class="box-card jiankong">
                  <div slot="header" class="clearfix">
                      <span>监控</span><span class="el-icon-question"></span>
                  </div>
                  <div class="lixian">
                      <div class="key1">
                          节点离线 <span>{{ deviceObj.LoRaWAN.total }}</span>
                      </div>
                      <div class="key1">
                          网关离线 <span>{{ deviceObj.group }}</span>
                      </div>
                      <div class="key1">
                          传感器低电量
                          <span class="pink">{{ deviceObj.sensor.lowBattery }}</span>
                      </div>
                  </div>
              </el-card>
          </div>
          <!-- 监控 -->
          <!-- 公告 -->
          <!-- <div class="gailan-r">
              
              <el-card class="box-card gonggao">
                  <div slot="header" class="clearfix">
                      <span>公告</span><span class="el-icon-question"></span>
                  </div>
                  <div v-for="o in 2" :key="o" class="text item">
                      <span class="el-icon-warning-outline"></span><span>senseCAP V3 02020-02-13 14:28:07 </span>
                  </div>
              </el-card>
          </div> -->
     
</template>

<script>
export default {
    name:'GaiLan',
    props:['deviceObj']
}
</script>

<style scoped lang="scss">

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