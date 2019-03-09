<template>
<div class="customerVip">

  <div class="log">
    <!-- 登录管理 -->
      <div class="loginImg">
        <img src="./../../assets/login1.jpg" style="width: 406px;height:364px;">
      </div>
      <div class="login" style="margin-top: 36px;">
        <span class="title" style="">商场后台管理系统登录</span>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="name">
          <i class="fa fa-user-circle-o" aria-hidden="true" style="font-size: 20px;
        margin-top: 9px;"></i>
            <el-input type="text" v-model="ruleForm2.name" auto-complete="off" style="width: 81%;margin-bottom: 12px;margin-left: 10px;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
          <i aria-hidden="true" class="fa fa-lock" style="font-size: 24px;margin-top: 9px;"></i>
            <el-input type="password" v-model="ruleForm2.pass" @keyup.enter.native="submitForm('ruleForm2')"  auto-complete="off" style="width: 81%;margin-bottom: 12px;margin-left: 15px;">
            </el-input>
            <p style="color:#2894FF; padding-left: 40px; font-size: 12px">测试账号：123/123123</p>
          </el-form-item>
          
          <div class="sub">    
            <el-form-item>
              <div >
                <el-button @click="submitForm('ruleForm2')" style="margin-left: 37px;">登录</el-button>
                <el-button @click="resetForm('ruleForm2')" style="margin-left: 112px;">退出</el-button>
              </div>
            </el-form-item>
          </div>

        </el-form>    
      </div>
  </div>
  <div class="footer">
    <span class="tips">&copy;   2018   &copy;&nbsp;&nbsp;&nbsp;2014级软件服务外包2班  &nbsp;&nbsp;&#64;设计：吴雅茵  友情链接&nbsp;|&nbsp;<a href="http://www.lingnan.edu.cn/">岭南师范学院</a>&nbsp;|&nbsp;<a href="http://202.192.128.39/xxxy/">信息工程学院</a></span>
  </div>
     
</div>
</template>
<script>
 

 export default {
      data () {
        var validateName = (rule, value, callback) => {
           if (value === '') {
            callback(new Error('请输入账号'));
          }
          if (value !== '123') {
                callback(new Error('帐号不存在！'));
           }
          else {
            if (this.ruleForm2.pass !== '') {
              this.$refs.ruleForm2.validateField('pass');
            }
            callback();
          }
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else if (value !== '123123') {
            callback(new Error('密码错误!'));
          } else {
            callback();
          }
        };
        const validatePass1 = (rule, value, callback) => {
            if (value.length < 6) {
              callback(new Error('密码不能小于6位'));
            } else {
              callback();
            }
          };
            return {
             ruleForm2: {
            name: '',
            pass: ''
          },
          rules2: {
            name: [
              { validator: validateName, trigger: 'blur' }
            ],
            pass: [
              { required: true, trigger: 'blur', validator: validatePass1 },
              { validator: validatePass, trigger: 'blur' }
            ]
          }
        };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/index/readme');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  .customerVip{
    /*position: absolute;*/
  }
  .customerVip .log{
    background: #D0E9FF;
    width:900px;
    height: 364px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

  }
  .customerVip .loginImg{
    float: left;
  }
  .customerVip .login{
    float: left;
  }
  .login span.title{
    color:#2F0000;
    font-size: 28px;
    margin-left: 100px;
  }
  .customerVip .login.el-input,.customerVip .login .el-input__inner {
    width: 121%;
  }
  .customerVip .login .el-form{
    margin-top: 43px;
  }   
  .customerVip .sub .el-form-item__content{
    margin-left: 126px;
  }
  .customerVip .sub .el-form-item{
    margin-top: 28px;
  }
  .customerVip .login .el-form-item__label {
    padding: 13px 12px 11px 0;
  }
  .customerVip .login .el-form-item__error{
    margin-left: 29px;
  }
  .customerVip .login .el-form-item.is-required .el-form-item__label:before {
    content: '';
  }
  .customerVip .footer span.tips{
    position: absolute;
    bottom: 2%;
    /* margin: 0 auto; */
    text-align: center;
    left: 33%;
  }
</style>
    