<template >
  <div class="login">
    <!-- <Navbar /> -->
    <el-form class="denglu"
    :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        
    >
      <img class="img2" src="@/assets/img/cn.png" alt="" />
      <img class="img1" src="@/assets/img/logo.png" alt="" />
      <div class="zhanghao">{{$t('lang.account')}}：</div>
      <el-form-item label=""  prop="account" class="inp1">      
        <el-input
        placeholder="请输入账号"
        v-model="ruleForm.account"
        clearable
        class="inp"
        inline-message="false"
      >
      </el-input>
    </el-form-item>
      <div class="mima">{{$t('lang.password')}}:</div>
      <el-form-item label="" prop="password" class="inp1">
        <el-input
        placeholder="请输入密码"
        v-model="ruleForm.password"
        show-password
        class="inp"
        inline-message="false"
      >
      </el-input>
    </el-form-item>  
      <a href="" class="mima">忘记密码？</a>
      <br />
      <span class="huadong">滑动验证：</span>
      <br />
      <div class="hua">
        <!-- <VerifySlider></VerifySlider> -->
      </div>

      <br />
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      <br />
      <br />
      <el-button plain>注册SenseCAP云平台账号</el-button>
    </el-form>
    <footer class="flex">
      <img src="@/assets/img/seeed.png" class="seeed" />
      <div class="copyright">
        <p>© 2008-2021</p>
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
          >粤ICP备13058720号</a
        >
      </div>
      <router-link to="/"></router-link>
      <img src="@/assets/img/mcafee.png" class="mcafee" />
      <div class="cn">
        <el-select  v-model="lang" :placeholder="$t('lang.lang')" @change="languge">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
        
    </footer>
  </div>
</template>

<script>
export default {
  name: "indexView",
  data() {
    return {
      options: [{
          value: 'en',
          label: this.$t("lang.is")
        }, {
          value: 'zh',
          label: this.$t("lang.cs")
        }],
        lang: "",
      value: '',
      ruleForm: {
        account: "", //账号
        password: "", //密码
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "账号的长度在3到10字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    }
  }
  },
  methods: {
    languge() {
      console.log(666);
      // 调用 vuex 中的mutations
      this.$store.commit("SET_LANG", this.lang);
      // 刷新页面
      this.$router.go(0);
    },
    submitForm() {
      console.log("登录的函数触发了");
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // alert("submit!");
          // 登录的所有动作我们写在vuex中
          //在这里只需要调用vuex的动作
          this.$store.dispatch("LoginAction", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },



};
</script>

<style lang="scss" scoped>
.login{
  position: relative;
}
.denglu {
  position: absolute;
  width: 378px;
  height: 495px;
  margin: auto;
  border-radius: 10px 0 10px 10px;
  top: 30px;
  left: 35%;
  background: white;
  text-align: center;
  .zhanghao {
    margin-right: 255px;
  }
  .mima {
    margin-right: 240px;
  }
  .huadong {
    margin-right: 220px;
  }
  .hua {
    margin-top: 10px;
    margin-left: 40px;
  }
  .inp {
    width: 290px;
    margin-left: 0px;
  }
  .inp1 {
    width: 260px;
    margin-left: 40px;
  }
  .drag_text[data-v-788839f3] {
    text-align: center;
  }
  .img1 {
    width: 170px;
    height: 50px;
    display: table-cell;
    margin-left: 100px;
  }
  .img2 {
    width: 50px;
    height: 50px;
    margin-top: 0px;
    margin-left: 328px;
  }

  .yd {
    margin-left: 50px;
  }
  a {
    font-size: 10px;
  }
}
.el-button--primary {
  width: 280px;
}
.el-button {
  width: 290px;
}
.login footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 100%;
  background: #fff;
  color: #4f4d4d;
  position: fixed;
  bottom: 0;
}

.login footer .seeed {
  width: 116px;
  height: auto;
}

.login footer .mcafee {
  width: 75px;
  height: auto;
  margin: 0 42px;
}

.login footer .copyright {
  font-size: 12px;
  line-height: 20px;
  margin: 0 42px;
}

.login footer .copyright a {
  color: inherit;
}

.login footer > a {
  font-size: 12px;
}
.el-form-item__error {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    margin-left: 50px;
}
</style>


