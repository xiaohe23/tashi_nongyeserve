<template>
  <div>
    <ConTitle :topTitle="topTitle"></ConTitle>

    <!-- 提交的表单 -->
    <el-form label-position="right" label-width="80px" :model="measurementAdd"
      style="background-color: #fff;margin: 10px 0 0 0;
      height: 230px;padding: 20px 0 0 0;padding-left: 60px;">
  <el-form-item label="测量名称">
    <el-input style="width: 250px;" v-model="measurementAdd.name"></el-input>
  </el-form-item>
  <el-form-item label="测量单位">
    <el-input style="width: 250px;" v-model="measurementAdd.unit"></el-input>
  </el-form-item>

    <div style="display:flex;margin-right: 300px;">
      <div><el-button type="primary" size="small" @click="measurementaddto">确认</el-button></div>
      <div><el-button size="small">取消</el-button></div>
    </div>
  </el-form>
  </div>
</template>

<script>
 import ConTitle from '@/components/ConTitle.vue'
 import {$measurementadd} from '@/api/index.js'
export default {
    name:'measurementAdd',
    components:{
        ConTitle
    },
    data(){
          return{
          topTitle: {
            type: "子账号", //非首页，该页面的上一级
            text: "添加子账号-",
            msg: "可添加当前组织的子账号，并为其分配权限",         
          },
          measurementAdd:{name:"",unit:""}
        }
    },
    methods:{
        measurementaddto(){


            this.$confirm('是否添加新测量类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            $measurementadd({name:this.measurementAdd.name,unit:this.measurementAdd.unit})
            .then(
                ()=>{
                    this.$message({
            type: 'success',
            message: '添加成功!'
            
            });
            this.$router.push('/measurement/measurementlist')
            }
        )
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });

          
        }
    }
}
</script>

<style>

</style>