<template>
   <div class="gailan-r">
              
              <el-card class="box-card gonggao">
                  <div slot="header" class="clearfix">
                      <span>公告</span><span class="el-icon-question"></span>
                  </div>
                  <div v-for="o in 2" :key="o" class="text item">
                      <span class="el-icon-warning-outline"></span><span>senseCAP V3 02020-02-13 14:28:07 </span>
                  </div>
              </el-card>
          </div>
</template>

<script>
export default {
    name:'GongGao'
}
</script>

<style scoped lang="scss">

.gailan-r {
          width: 20%;
          margin-left: 10px;

          .gonggao {
              height: 245px;
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