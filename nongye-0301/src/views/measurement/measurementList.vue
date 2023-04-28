<template>
    <div>
      <ConTitle :topTitle="topTitle"></ConTitle>

        <!-- 弹窗 -->
        <el-dialog title="修改测量类型"  :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="measurementfrom"
        :rules="rules"
        ref="ruleForm"
        label-width="6.25rem"
        class="demo-ruleForm"
      >
        <el-form-item label="测量类型名称" :prop=measurementfrom.name>
          <el-input
            v-model="measurementfrom.name"
            placeholder="请输入测量类型名称"
          ></el-input>
          
        </el-form-item>
        <el-form-item label="测量类型单位">
            <el-input
            v-model="measurementfrom.unit"
            placeholder="请输入测量类型单位"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>

      <template>
  <el-table
    :data="measurementlist"
    style="width: 100%;margin-top: 10px;">
    <el-table-column
      fixed
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      prop="id"
      label="测试id"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="测试名称"
      width="160">
    </el-table-column>
    <el-table-column
      prop="unit"
      label="测量单位"
      width="120">
    </el-table-column>
    <el-table-column
      prop="cTime"
      label="创建时间"
      width="200">
      <template slot-scope="scope">
          {{ scope.row.cTime | formatTime }}
        </template>
    </el-table-column>
    <el-table-column
      prop="uTime"
      label="更新时间"
      width="200">
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
          <div><el-button type="primary" icon="el-icon-edit" circle @click="measurementlistedit(scope.row.id)"></el-button></div>
        <div><el-button type="danger" icon="el-icon-delete" circle  @click="measurementlistdel(scope.row.id)"></el-button></div>
        </div>
        
      </template>
    </el-table-column>
  </el-table>
</template>

    </div>
  </template>
  
  <script>
   import ConTitle from '@/components/ConTitle.vue'
   import {$measurementlist,$measurementdel,$measurementedit} from '@/api/index.js'
   import moment from 'moment'
  export default {
      name:'measurementList',
      components:{
          ConTitle
      },
      data(){
            return{
            topTitle: {
              type: "自定义类型", //非首页，该页面的上一级
              text: "测量类型-",
              msg: "展示所有自定义的测量类型，提供了添加测量类型，修改测量类型，删除测量雷鑫等功能",         
            },
            measurementlist:[],
            dialogVisible:false,
            measurementfrom:{name:'',unit:''},
            editid:'' ,  //传过来的id
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
        $measurementlist().then(
        (res)=>{
          this.measurementlist=res.data
        }
      )  
      },
      //类型删除
      measurementlistdel(id){

        this.$confirm('此操作将永久删除该测量类型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          $measurementdel({id:id}).then(
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
      },
      //类型修改
      measurementlistedit(id){
        this.editid=id
        this.dialogVisible=true
      },
      //确定
      handleOK(){
        console.log(111);
        $measurementedit({id:this.editid,name:this.measurementfrom.name,unit:this.measurementfrom.unit})
        .then(
            res=>{
            if(res.msg=="success"){
                
                this.$alert('修改成功', '', {
                confirmButtonText: '确定',
                
                });
                this.editid=""
                this.dialogVisible=false
                this.measurementfrom.name=''
                this.measurementfrom.unit=''
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
      }
    },
    filters: {
    //   将事件戳转日期时间
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    }
  }
  </script>
  
  <style>
  
  </style>