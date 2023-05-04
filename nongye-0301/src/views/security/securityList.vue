<template>
  <div>
    <ConTitle :topTitle="topTitle"></ConTitle>
    <el-dialog title="修改测量类型"  :visible.sync="dialogVisible1" width="30%">
      <el-form
        :model="securityfrom"
        :rules="rules"
        ref="ruleForm"
        label-width="6.25rem"
        class="demo-ruleForm"
      >
        <el-form-item label="测量类型名称" :prop=securityfrom.username>
          <el-input
            v-model="securityfrom.username"
            placeholder="请输入测量类型名称"
          ></el-input>
          
        </el-form-item>
        <el-form-item label="测量类型单位">
            <el-input
            v-model="securityfrom.type"
            placeholder="请输入测量类型单位"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>
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
      
      label="标签"
      width="120">
      <template slot-scope="scope">
          {{ scope.row.tag || scope.row.username }}
        </template>
    </el-table-column>
    <el-table-column
      prop="authority"
      label="访问权限"
      width="120">
      <template slot-scope="scope">
          {{ scope.row.tag || scope.row.type }}
        </template>
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
      width="100" prop="id">
      <template slot-scope="scope">
        <div style="display:flex;justify-content: space-around;">
          <div><el-button type="primary" icon="el-icon-edit" circle @click="secrityedit(scope.row.id)"></el-button></div>
        <div><el-button type="danger" icon="el-icon-delete" circle  @click="secritydel(scope.row.id)"></el-button></div>
        </div>
        
      </template>
    </el-table-column>
  </el-table>
</template>

  </div>
</template>

<script>
import ConTitle from '@/components/ConTitle.vue'
import {$securitylist,$securitydel,$securityedit} from '@/api/index.js'
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
        securitylist:[],
        securityfrom:{security:"",username:"",type:"",desc:""},
        dialogVisible1:false,
        editid:'',
        rules: {
        groupName: [
          { required: true, message: "请输入群组名称", trigger: "blur" },
        ],
        },
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        $securitylist().then(
        (res)=>{
          this.securitylist=res.data
        }
      )  
      },
      //修改
      secrityedit(id){
        this.editid=id
        this.dialogVisible1=true
      },
      //确定
      handleOK(){
        console.log(111);
        //传测试名称，测试单位
        $securityedit({id:this.editid,security:"账号",username:this.securityfrom.username,
        type:this.securityfrom.type,desc:"描述"})
        .then(
            res=>{
            if(res.msg=="success"){
                
                this.$alert('修改成功', '', {
                confirmButtonText: '确定',
                
                });
                this.editid=""
                this.dialogVisible1=false
                this.securityfrom.username=''
                this.securityfrom.type=''
              this.getData()
            }else{
                this.$alert('修改失败', '', {
                confirmButtonText: '确定',
                callback: action => {
                this.$message({
                type: 'info',
                message: `action: ${ action }`
                });
                }
                });
            }
          }
        )
      },
      // secrityedit(id){
      //   this.$confirm('此操作将修改该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     $securityedit({id:id,security:"账号",username:"用户名",type:"类型",desc:"描述"
      //     }).then(
      //     res=>{
      //       if(res.msg=="success"){
      //         this.getData()
      //       }
      //     }
      //   )
      //     this.$message({
      //       type: 'success',
      //       message: '修改成功!'
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });          
      //   });
      // },
      //删除
      secritydel(id){
              
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $securitydel({id:id}).then(
          res=>{
            if(res.msg=="success"){
              this.getData()
            }
          }
        )
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
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