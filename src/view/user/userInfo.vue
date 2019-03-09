<template>
  <div class="userInfo">
    <!-- 面包屑导航 (已封装)-->
    <!--  <div class="bre-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>员工基本信息</el-breadcrumb-item>  
        </el-breadcrumb>
     </div> -->
    <!-- 表头 -->
    <div class="info-top">
      <el-form :inline="true" v-model="list" class="demo-form-inline" >

        <el-form-item>
        <el-form-item label=""><!-- 搜索条件 -->
          <el-input @keyup.enter.native="handleFilter" v-model="listQuery.employName" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-button type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
        <el-button type="primary" v-waves icon="edit" @click="handleCreate">新增</el-button>
        <el-button type="primary" v-waves icon="edit" @click="handleDelAll">批量删除</el-button>
        <el-button type="primary" v-waves icon="document" @click="handleDownload">导出</el-button>

        </el-form-item>
      </el-form>
    </div>
    
    <!-- 表头的新增操作 -->
    <div class="add">
      <el-dialog title="表单新增" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-input v-model="form.employName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工性别" :label-width="formLabelWidth">
              <el-input v-model="form.sex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工类别" :label-width="formLabelWidth">
            <el-select v-model="form.employType" placeholder="请选择活动区域">
              <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="家庭地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
              <el-input v-model="form.entrydate" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-waves @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-waves type="primary" @click="handleCreateSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <router-view></router-view>
    </div>

    <!-- 表格内容 -->
    <div class="info-con"> 
      <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%"
       @selection-change="handleSelectionChange" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
          <el-table-column type="selection" width="55"></el-table-column>
         <!--  <el-table-column v-model="form.id" prop="id" label="ID" width="60"></el-table-column> -->
          <el-table-column align="center" label='序号' width="">
            <template scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>

          <!-- <el-table-column v-model="form.name" prop="name" label="姓名" width="120"></el-table-column> -->
          <el-table-column label="员工姓名" align="center" width="100">
            <template scope="scope">
              {{scope.row.employName}}
            </template>
          </el-table-column>
          
          <el-table-column label="员工性别"  align="center" width="100">
            <template scope="scope">
              <span v-if="scope.row.sex == '男'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>

          <el-table-column label="员工类型"  align="center" width="100">
            <template scope="scope">
              <span v-if="scope.row.employType == '001'">主管</span>
              <span v-if="scope.row.employType == '002'">普通员工</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="手机号码" width="150">
                <template scope="scope">
                  <span>{{scope.row.phoneNumber}}</span>
                </template>
            </el-table-column>
          <!-- <el-table-column v-model="form.address" prop="address" label="家庭地址" width="240" show-overflow-tooltip></el-table-column> -->
          <el-table-column align="center"  label="家庭住址" width="150">
                <template scope="scope">
                  <span>{{scope.row.address}}</span>
                </template>
            </el-table-column>
          <!-- <el-table-column v-model="form.date" label="入职时间" width="120"> <template scope="scope">{{ scope.row.date }}</template></el-table-column> -->
          <el-table-column align="center"  label="入职时间" width="120">
                <template scope="scope">
                  <span>{{scope.row.entrydate | formatDate}}</span><!-- 转换时间格式 -->
                </template>
            </el-table-column>

          <el-table-column label="操作" align="center" width="150">
            <template scope="scope">
              <el-button v-waves size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button v-waves size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

      <div style="margin-top: 20px">
        <el-button v-waves @click="toggleSelection([list[0], list[1],list[2],list[3],list[4],list[5],list[6]])">全选</el-button>
        <el-button v-waves @click="toggleSelection()">取消全选</el-button>
      </div>
    </div>

<!-- 表格中的编辑操作 -->
  <!--   <div class="edit">
      <el-dialog title="员工信息变更表" :visible.sync="dialogFormVisible1">
        <el-form :model="editForm">
          <el-form-item label="员工编号ID" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工类别" :label-width="formLabelWidth">
            <el-select v-model="editForm.type" placeholder="请选择活动区域">
              <el-option label="主管" value="主管"></el-option>
              <el-option label="普通员工" value="普通员工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
              <el-input v-model="editForm.phoneNumber" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="家庭地址" :label-width="formLabelWidth">
              <el-input v-model="editForm.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" :label-width="formLabelWidth">
              <el-input v-model="editForm.date" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
         
            <el-button v-waves @click="handledoneEdit('ruleForm')">完成编辑</el-button>
            <el-button v-waves type="primary" @click="dialogFormVisible1 = false">取消编辑</el-button>
          
        </div>
      </el-dialog>
      <router-view></router-view>
    </div>
 -->

    <!-- 分页 -->
    <div class="info-footer">
        <div class="block" v-show="!listLoading">
           <span class="demonstration"></span>
           <el-pagination
             @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
             :current-page.sync="listQuery.currPage"
             :page-sizes="[10, 20, 30, 50]"
             :page-size="listQuery.pageSize"
             layout="total, sizes, prev, pager, next, jumper"
             :total="total">
           </el-pagination>
         </div>

    </div>

  </div>
 
</template>

<script>
     import {api} from '@/global/api'
     import {global} from '@/global/global';
     import { Message } from 'element-ui';
     import {formatDate} from '@/filters/index'; //时间格式化
     import {export_json_to_excel} from '@/vendor/Export2Excel';//导出

     export default {
       data() {
         return {
           
           list:null,//用来接收来自数据库数据
           // 表头的新增操作
           total:null,
           listLoading:true,
           listQuery:{
              currPage:1,
              pageSize:10,
              employName:''
           },
           //新增表单
           form: {
                 "sex": "",
                 "employName": "",
                 "employType": "",
                 "phoneNumber": "",
                 "address": "",
                 "entrydate": "",
                 "orderNum": 10
           },
           //编辑表单
          // editForm: {
          //        "sex": "",
          //        "employName": "",
          //        "employType": "",
          //        "phoneNumber": "",
          //        "address": "",
          //        "entrydate": "",
          //        "orderNum": 10
          // },
           typeOptions:[
              {key:'001',display_name:'主管'},
              {key:'002',display_name:'普通员工'}
           ],
           formLabelWidth: '120px',
           //表单数据（已在JSon文件中引用）
           dialogFormVisible: false,
           dialogFormVisible1:false,
           multipleSelection: [],//定义选中多行的属性，用于函数的传参
          // 表尾分页
          

         }
       },

       //过滤器--时间格式转换
       filters:{
          formatDate
       },

       mounted(){
        var vm=this;
        vm.getList();//获取后台数据

        //修改时再调用
        // vm.getFormData();

       },
       methods: {
        //数据渲染--获取列表数据
        getList(){
          // console.log(66666666666666666666666)
            let vm = this;

            vm.listLoading = true;

          global.get( api.queryUser,{params: vm.listQuery},function(res){
               console.log('----获取到员工基本信息页面的数据：',JSON.stringify(res) )
              let data = res.body;
              if(data.resultCode == 0){//存在数据
                console.log("------",data.resultCode)
                vm.list = data.data.data;
                // console.log('列表数据',vm.list);
                vm.listQuery.currPage = data.data.currPage;
                vm.listQuery.pageSize = data.data.pageSize;
                vm.total = data.data.tatal;

                vm.listLoading = false;
                // console.log(66666666666666666666666)
              }else{
                Message({
                  showClose:true,
                  message:res.body.resultMsg,
                  type:'error'
                });
                vm.listLoading = false;
              }
          },function(res){
            alert("请求失败了");
            vm.listLoading = false;
          },false)

         },

        //  //编辑---根据id查询表单数据
        // getFormData:function(){
        //   var vm = this;
        //   var data = this.$route.query;
        //   console.log('获取到url参数：',data);
        //   //根据url中的参数，进行ajax获取表单数据
        //   global.get(api.queryUserItem,{params:{'id':data.id}},function(res){
        //     console.log('-------根据id获取表单信息：',JSON.stringify(res) );
        //     if(res.body.resultCode == 0){
        //       var res = res.body.data;
        //       console.log('=====',res);
        //       vm.editForm = res
        //     }else{
        //       //alert(res.body.resultMsg)
        //                     Message({
        //                         showClose: true,
        //                         message: res.body.resultMsg,
        //                         type: 'error'
        //                     });
        //     }
        //   },function(res){
        //     //失败回调
        //   },true)
        // },
      
         // 新增
         handleCreate(){
          /* 无接口时实现
           //每次新增时，重置下新增表单数据，避免双向绑定影响
           this.initForm();
           this.dialogFormVisible = true;
          */
          //添加接口时
          //跳转到新增页面
          this.$router.push('/index/user/newUser')//最后一层路径，是根据index.js的path来定的，坑了我一晚，啊啊啊啊 2018.4.25

         },
         // 新增提交
         handleCreateSubmit(){
            var vm = this;
            console.log('新增的入参：',vm.form);
            //这里作演示用，正式新增 请提交到接口
            vm.list.push(vm.form);//
            console.log('新增后的所有数据：',vm.list);
            this.dialogFormVisible = false;
         },
         //操作中的编辑
         handleEdit(index, row) {
            
            this.dialogFormVisible1 = true;
            let vm = this;
            // console.log("选中的条数：",index, "选中的row属性：",row);
            this.$router.push({path:'./userEdit',query:{id:row._id}});//带参跳转
         },
        // //具体编辑操作实现
        // handledoneEdit(formName){
        //   let that = this;

        //   this.$refs[formName].validate((valid) => {
        //     if(valid){
        //       console.log('提交入参：',this.editForm);

        //       global.post('http://localhost:3000/api/modifyUser',this.editForm,null,function(res){
        //         //alert('插入数据成功，接口返回的数据为：',res)
                          
        //                   //正式编程以下代码请放到接口成功回调函数中
        //                   Message({
        //                       showClose: true,
        //                       message: '提交成功，正在跳转页面……',
        //                       type: 'success'
        //                   })
        //                   setTimeout(()=>{
        //                     that.$route.push('./userInfo')
        //                   },2000)

        //       },function(res){
        //         alert('插入数据失败，接口返回的数据为：',res)
        //       })
        //     } else{
        //       console.log('error submit!!');
        //       return false;
        //     }
        //   });
        // },

         //操作中的单个删除
         handleDelete(index, row) {  
            let vm = this;
            console.log("单个删除的index：",index,"单个删除的row：",row);
            //前端删除
            // this.list.splice(index,1);
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          // console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")//2018.2.26 晚 进行到这里了，明天继续
          vm.delFun(row);

            this.$message({
              type: 'success',
              message: '删除成功!'
            });
        }).catch( () => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
        });
         },
         //调取删除接口的删除方法
         delFun(row){
           let vm = this;

           global.get( api.delUser,{params: {'id':row['_id']} },function(res){//此处只能用get请求，与后端接口一致
            console.log("进到del接口")//此处进不来
           console.log('-------获取到即将要删除的数据：',JSON.stringify(res) )
           vm.getList();  
                         
           },function(res){
               alert('删除报错')
               vm.listLoading = false;
           },false)
         },
         //批量删除
         handleDelAll(){
            let vm = this;
            console.log("批量删除的row：",vm.multipleSelection);//对象数组
            //实际开发，不需要使用splice，我们只需要对 vm.multipleSelection 进行for循环，然后拿到每一条id，拼接成一个数组传给接口即可，例如[1,3,5]
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定批量删除',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //前端依次执行单个删除操作
                for (var index in vm.multipleSelection) {
                    console.log('======',vm.multipleSelection[index])
                    vm.delFun(vm.multipleSelection[index]);
                };
                

                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });


            }).catch(() => {
                // this.$message({
                //   type: 'info',
                //   message: '已取消删除'
                // });          
            });
         },
         //表头的导出
         handleDownload(){
            // console.log("表头已导出！（未实现）");
            let vm = this;

            require.ensure([], () => {
              // const { export_json_to_excel } = require('vendor/Export2Excel');
              const tHeader = ['员工姓名', '员工性别', '员工类别', '联系方式', '家庭地址','入职时间'];
              const filterVal = ['employName', 'sex', 'employType', 'phoneNumber', 'address','entrydate'];
              const list = vm.list;
              const data = vm.formatJson(filterVal, list);
              export_json_to_excel(tHeader, data, '导出的列表excel');
            })
         },
         formatJson(filterVal, jsonData) {
           return jsonData.map(v => filterVal.map(j => v[j]))
         },

         //切换选中状态
         toggleSelection(rows) {
           if (rows) {
             rows.forEach(row => {
               this.$refs.multipleTable.toggleRowSelection(row);
             });
           } else {
             this.$refs.multipleTable.clearSelection();
           }
         },
         //选择改变
         handleSelectionChange(val) {
           this.multipleSelection = val; //[]
         },
         //搜索
         handleFilter() {
           this.getList();
         },
         //操作表尾分页
         handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.listQuery.pageSize = val;
          this.getList();
         },
        //操作表尾分页
        handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          //console.log('--------',val)
          this.listQuery.currPage = val;
          this.getList();
         },



       }
     }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .userInfo{
    position: absolute;
  }
  .info-top{
    margin: 20px 10px;
  }
  .demo-form-inline{
    margin-left: 50px;
  }
  .info-con{
    margin: 20px 10px;
  }
 
</style>