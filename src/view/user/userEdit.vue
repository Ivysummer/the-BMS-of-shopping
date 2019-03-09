<template>
	<!-- 表格中的编辑操作 -->
    <div class="edit">
      <el-dialog title="员工信息变更表" :visible.sync="dialogFormVisible1">
        <el-form :model="editForm">
          <!-- <el-form-item label="员工编号ID" :label-width="formLabelWidth">
              <el-input auto-complete="off">
                <template scope="scope">
                  {{scope.$index}}
                </template>
              </el-input>
          </el-form-item> -->
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-input v-model="editForm.employName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工性别" :label-width="formLabelWidth">
            <el-radio-group v-model="editForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="员工类别" :label-width="formLabelWidth">
            <el-select v-model="editForm.employType" placeholder="请选择员工类别"><!-- 必须加上value，且与前面字段一致 -->
              <el-option label="主管" value="001"></el-option>
              <el-option label="普通员工" value="002"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input v-model="editForm.phoneNumber" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="家庭地址" :label-width="formLabelWidth">
              <el-input v-model="editForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
              <el-input v-model="editForm.entrydate" @change="getsTime" format="yyyy-MM-dd" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         
            <el-button v-waves @click="handledoneEdit('ruleForm')">完成编辑</el-button>
            <el-button v-waves type="primary" @click="cancelEdit('ruleForm')">取消编辑</el-button>
          
        </div>
      </el-dialog>
      <router-view></router-view>
    </div>
</template>

<script>
	import { Message } from 'element-ui';
  import {global} from '@/global/global';
  import {api} from '@/global/api';

    export default {
    	data(){
    		return{
    			editForm: {
                 "employName": "",
                 "sex":"",
                 "employType": "",
                 "phoneNumber": "",
                 "address": "",
                 "entrydate": "",
          },
          dialogFormVisible1:true,//是否显示编辑弹窗
          formLabelWidth: '120px',



    		}
    	},

    	mounted(){
    		var vm = this;

    		//修改(编辑)时再调用
            vm.getFormData();
    	},

    	methods:{
    		//根据id查询表单数据
    		getFormData:function(){
    			var vm = this;
    			var data = this.$route.query;
    			console.log('获取到url参数：',data);
    			//根据url中的参数，进行ajax获取表单数据，即获取userInfo页面的对应数据项。
          //此处只能用get方法请求
    			global.get(api.queryUserItem,{params:{'id':data.id}},function(res){
    				console.log('-------根据id获取表单信息：',JSON.stringify(res) );
    				if(res.body.resultCode == 0){
    					var res = res.body.data;
    					console.log('=====',res);
    					vm.editForm = res
    				}else{
    					//alert(res.body.resultMsg)
                            Message({
                                showClose: true,
                                message: res.body.resultMsg,
                                type: 'error'
                            });
    				}
    			},function(res){
    				//失败回调
    			},true)
    		},
    		//具体编辑操作实现
    		handledoneEdit(formName){
    			let that = this;

          global.post('http://localhost:3000/api/modifyUser',this.editForm,null,function(res){
                //alert('插入数据成功，接口返回的数据为：',res)
                          
                          //正式编程以下代码请放到接口成功回调函数中
                          Message({
                              showClose: true,
                              message: '提交成功，正在跳转页面……',
                              type: 'success'
                          })
                          setTimeout(()=>{
                            that.$router.push('./userInfo')
                          },2000)

              },function(res){
                alert('插入数据失败，接口返回的数据为：',res)
              })
    		},

    		//重置
    		cancelEdit(formName){
          var vm = this;
    			setTimeout(()=>{
                            vm.$router.push('./userInfo')
                          },500)
    		},
        //时间格式化
        getsTime(val) {
              this.ruleForm.entrydate=val;//这个entrydate是在data中声明的，也就是v-model绑定的值
          }


    	}
    }

</script>

<style scoped>
/*	* {
	padding: 0;
	margin: 0;
	}*/
	
</style>