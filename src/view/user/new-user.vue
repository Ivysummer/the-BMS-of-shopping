<template>
  <div class="new-user">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- 面包屑导航 -->
   <!--  <div class="bre-crumb">
       <el-breadcrumb separator="/">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>入职新员工</el-breadcrumb-item>  
       </el-breadcrumb>
    </div> -->

    <!-- 验证新增表单 -->
    <div class="ruleForm">
      <h1 class="title">入职新员工信息收集表</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="500px" class="demo-ruleForm">
       <!--  <el-form-item label="员工编号" prop="id" :label-width="formLabelWidth">
          <el-col :span="11" >
            <el-input v-model="ruleForm.id"></el-input>
          </el-col>
        </el-form-item> -->
        <el-form-item label="员工姓名" prop="employName" :label-width="formLabelWidth">
          <el-col :span="11" >
            <el-input v-model="ruleForm.employName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="员工性别" prop="sex" :label-width="formLabelWidth">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="应聘职位" prop="employType" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-select v-model="ruleForm.employType" placeholder="请选择应聘职位">
              <el-option label="主管" value="001"></el-option>
              <el-option label="普通员工" value="002"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber" :label-width="formLabelWidth">
          <el-col :span="11" >
            <el-input v-model="ruleForm.phoneNumber"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="家庭地址" prop="address" :label-width="formLabelWidth">
          <el-col :span="11" >
            <el-input v-model="ruleForm.address"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="入职时间" required :label-width="formLabelWidth">
          <el-col :span="11">
            <el-form-item prop="entrydate">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.entrydate" @change="getsTime" format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
              <!-- :picker-options="formatDate" -->
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="安排住宿" prop="delivery" :label-width="formLabelWidth">
          <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
        </el-form-item>

        <el-form-item label="员工生日" prop="birthday" :label-width="formLabelWidth">
          <el-date-picker v-model="ruleForm.birthday" type="date" placeholder="选择日期" ></el-date-picker>
        </el-form-item>
        <el-form-item label="个人特长" prop="desc" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  import { Message } from 'element-ui';
  import {global} from '@/global/global';
  import {api} from '@/global/api';
  import {formatDate} from '@/filters/index';


  export default {
      data () {
          return {
            // msg: 'Welcome to Your Vue.js App'
            formLabelWidth:"120px",
            ruleForm: {
                  employName: '',//员工姓名
                  sex: '',
                  employType: '',
                  phoneNumber:'',
                  address:'',
                  entrydate: '',
                  delivery: false,
                  birthday: '',
                  desc: ''
            },

            rules: {
              employName: [
                { required: true, message: '请输入员工姓名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              // region: [
              //   { required: true, message: '请选择活动区域', trigger: 'change' }
              // ],
              entrydate: [
                { type: 'date', required: true, message: '请入职时间', trigger: 'change' }
              ]
              // date2: [
              //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
              // ],
              // type: [
              //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
              // ],
              // sex: [
              //   { required: true, message: '请选择员工性别', trigger: 'change' }
              // ],
              // birthday: [
              //   { type: 'date', required: true, message: '请选择员工生日', trigger: 'change' }
              // ],
              // desc: [
              //   { required: true, message: '请填写活动形式', trigger: 'blur' }
              // ]
            },

            // pickerOptions0: {
            //          disabledDate(time) {
            //            return time.getTime() < Date.now() - 8.64e7;
            //          }
            //        }

          };
      },
      
      methods:{
          //根据id查询表单数据
          getFormData:function(){
            var vm = this;
            var data = this.$router.query;
            console.log('获取到url参数：',data);
          },
          submitForm(formName) {
               let that = this;
               // alert(1);
               this.$refs[formName].validate((valid) => {

                 if (valid) {

                   console.log('submit! 提交入参：',this.ruleForm);
                   // console.log("此新员工的基本信息为：",JSON.stringify(this.ruleForm));

                   global.post(api.addUser,this.ruleForm,null,function(res){
                        // alert(1);
                        console.log('插入数据成功，接口返回的数据为：',res)//正式编程以下代码请放到接口成功回调函数中
                        Message({
                            showClose:true,
                            message:'提交成功，正在跳转页面，请稍等...',
                            type:'success'
                        })
                        setTimeout(()=>{
                            that.$router.push('./userInfo')
                        },2000)
                   },function(){})

                 } else {
                   console.log('error submit!!');
                   return false;
                 }
               });
          },
          resetForm(formName) {
              this.$refs[formName].resetFields();
          },
          //时间格式化
          getsTime(val) {
                this.ruleForm.entrydate=val;//这个entrydate是在data中声明的，也就是v-model绑定的值
            }
       }




        }

      

</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .new-user{
    position: absolute;
  }
  .new-user .title{
    text-align: center;
    margin-bottom: 50px;
  }
  .new-user .el-col-2{
    text-align: center;
  }
  .new-user .btn{
    margin-left: 100px;
  }

  
</style>