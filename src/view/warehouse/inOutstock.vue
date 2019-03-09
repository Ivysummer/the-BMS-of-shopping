<template>
  <div class="post1">
    
    <el-tabs v-model="activeName2" @tab-click="">
        <el-tab-pane label="入库单" name="first">
           <!-- 入库 -->
            <div class="inbox1">
               <!--  <div class="con-header">
                    <div class="header-rg">
                      <el-form>
                         <el-form-item label="录制时间：">
                             <el-date-picker  v-model="value1" type="datetime" placeholder="选择时间"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="单据编号：">
                            <el-input ></el-input>
                        </el-form-item>
                      </el-form>
                   </div>
               </div>  
<template scope="scope">
              {{scope.$index+1}}
            </template>
               --> 
               <!-- 表格  -->
              <div class="grid">
                 <div class="layoutitem" style="width:100%;border:none;">
                   <el-table :data="IntableList" border style="width: 100%"  :default-sort = "{prop: 'ID', order: 'ascending'}">
                      <!-- <el-table-column prop="ID" label="ID" width="80" align="center"sortable> </el-table-column> -->
                      <el-table-column label="ID" width="80" align="center"sortable> 
                        <template scope="scope">
                          {{scope.$index+1}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="spbh" label="商品编号" width="150" align="center"> </el-table-column>
                      <el-table-column prop="name" label="商品名称" width="150" align="center"> </el-table-column>
                      <el-table-column prop="dw" label="采购公司" width="150" align="center"> </el-table-column>
                      <el-table-column prop="quantity" label="数量" width="110" align="center"> </el-table-column>
                      <el-table-column prop="rkdj" label="入库单价(元)" width="150" align="center"> </el-table-column>
                      <el-table-column prop="rkje" label="入库金额(元)" width="150" align="center"> </el-table-column>
                      <el-table-column prop="bz" label="备注" width="150" align="center"> </el-table-column>
                 </el-table>
               </div>    
              </div>
              <div class="cellspacing">
                 <div class="cell-zd">
                    <p style="margin-top: 20px;">制单人：<span>吴儿童</span></p>
                 </div>
                 <div class="cell-je" style="float:right">
                    <el-button type="danger" @click="InhandleCreate"  icon="edit">添加</el-button>
                    <el-button type="primary" @click="InhandleEdit" icon="edit">编辑</el-button>
                    <el-button type="primary" v-waves icon="document" @click="handleDownload">导出</el-button>
                 </div>
              </div>
              <!-- 添加 -->
              <el-dialog title="添加基本信息" :visible.sync="IndialogCreatVisible">
                    <el-form class="small-space" :model="inTemp" style='width: 300px; margin-left:50px;'>
                      <!-- <el-form-item label="ID">
                          <el-input v-model="inTemp.ID" ></el-input>
                      </el-form-item> -->
                      <el-form-item label="商品编号">
                          <el-input v-model="inTemp.spbh" ></el-input>
                      </el-form-item>
                      <el-form-item label="商品名称">
                          <el-input v-model="inTemp.name"></el-input>
                      </el-form-item>
                      <el-form-item label="采购公司">
                          <el-input v-model="inTemp.dw"></el-input>
                      </el-form-item>
                      <el-form-item label="数量">
                          <el-input v-model="inTemp.quantity"></el-input>
                      </el-form-item>
                      <el-form-item label="入库单价(元)" width="160">
                          <el-input v-model="inTemp.rkdj"></el-input>
                      </el-form-item>
                      <el-form-item label="入库金额(元)">
                          <el-input v-model="inTemp.rkje"></el-input>
                      </el-form-item>
                      <el-form-item label="备注">
                          <el-input v-model="inTemp.bz"></el-input>
                      </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                      <el-button @click="IndialogCreatVisible = false">取 消</el-button>
                     
                      <el-button type="primary" @click="InhandleCreateSubmit">确 定</el-button>
                    </div>
              </el-dialog>
              <!-- 编辑 -->
              <el-dialog title="编辑信息" :visible.sync="IndialogEditVisible">
                      <el-form class="small-space" :model="inTemp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
                        <!-- <el-form-item label="ID">
                          <el-input v-model="inTemp.ID"></el-input>
                        </el-form-item> -->
                        <el-form-item label="商品编号">
                          <el-input v-model="inTemp.spbh"></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称">
                          <el-input v-model="inTemp.name"></el-input>
                        </el-form-item>
                        <el-form-item label="入库单价(元)">
                          <el-input v-model="inTemp.rkdj"></el-input>
                        </el-form-item>
                        <el-form-item label="入库金额(元)">
                          <el-input v-model="inTemp.rkje"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input v-model="inTemp.bz"></el-input>
                        </el-form-item>
                      </el-form>

                      <div slot="footer" class="dialog-footer">
                        <el-button @click="IndialogEditVisible = false">取 消</el-button>
                       
                        <el-button type="primary" @click="InhandleEditSubmit">确 定</el-button>
                      </div>
              </el-dialog>
            </div>
        </el-tab-pane>

          <!-- 出库 -->
        <el-tab-pane label="出库单" name="second">
            <div class="inbox2">
              <!-- 表格 -->
            
              <div class="grid" style="width:100%">
                <div class="layoutitem" style="width:100%;border:7;" >
                   <el-table :data="OuttableList" border style="width: 100%" :default-sort = "{prop: 'number,PaymentID', order: 'ascending'}" >
                      <!-- <el-table-column prop="number" label="编号" align="center" width="150" sortable></el-table-column> -->
                      <el-table-column label="ID" width="80" align="center"sortable> 
                        <template scope="scope">
                          {{scope.$index+1}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="PaymentID" label="收款账户" align="center"sortable width="150"> </el-table-column>
                      <el-table-column prop="AccountName" label="账户姓名" align="center" width="150"> </el-table-column>
                      <el-table-column prop="ways" label="结算方式" align="center" width="150"> </el-table-column>
                      <el-table-column prop="money" label="金额" align="center" width="150"> </el-table-column>
                      <el-table-column prop="note" label="备注" align="center" width="150"> </el-table-column>
                 </el-table>
               </div>    
              </div>
              <!-- 表尾 -->
               <div class="cellspacing">
                  <div class="cell-zd">
                      <p style="margin-top: 20px;">制单人：<span>王平安</span></p>
                  </div>
                  <div class="cell-je" style="float:right">
                      <el-button type="danger" @click="handleCreate"  icon="edit">添加</el-button>
                      <el-button type="primary" @click="handleEdit"  icon="edit">编辑</el-button>
                      <el-button type="primary" @click="handleDelete" class="fa fa-trash-o">删除</el-button>
                  </div>
              </div>

              <!-- 添加 -->
              <el-dialog title="添加基本信息" :visible.sync="dialogCreatVisible">
                    <el-form class="small-space" :model="outTemp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>

                      <el-form-item label="编号">
                        <el-input v-model="outTemp.number"></el-input>
                      </el-form-item>

                      <el-form-item label="收款账户">
                        <el-input v-model="outTemp.PaymentID"></el-input>
                      </el-form-item>

                      <el-form-item label="账户姓名">
                        <el-input v-model="outTemp.AccountName"></el-input>
                      </el-form-item>

                      <el-form-item label="结算方式">
                        <el-input v-model="outTemp.ways"></el-input>
                      </el-form-item>
                      <el-form-item label="金额">
                        <el-input v-model="outTemp.money"></el-input>
                      </el-form-item>

                     <el-form-item label="备注">
                        <el-input v-model="outTemp.note"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogCreatVisible = false">取 消</el-button>
                     
                      <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
                    </div>
              </el-dialog>
              <!-- 编辑 -->
              <el-dialog title="编辑信息" :visible.sync="dialogEditVisible">
                    <el-form class="small-space" :model="outTemp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>

                      <!-- <el-form-item label="编号">
                        <el-input v-model="outTemp.number"></el-input>
                      </el-form-item> -->

                      <el-form-item label="收款账户">
                        <el-input v-model="outTemp.PaymentID"></el-input>
                      </el-form-item>

                      <el-form-item label="账户姓名">
                        <el-input v-model="outTemp.AccountName"></el-input>
                      </el-form-item>

                      <el-form-item label="结算方式">
                        <el-input v-model="outTemp.ways"></el-input>
                      </el-form-item>
                      <el-form-item label="金额">
                        <el-input v-model="outTemp.money"></el-input>
                      </el-form-item>

                     <el-form-item label="备注">
                        <el-input v-model="outTemp.note"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogEditVisible = false">取 消</el-button>
                     
                      <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
                    </div>
              </el-dialog>
              <el-dialog title="请输入要删除的信息" :visible.sync="dialogDeleteVisible">
                    <el-form class="small-space" :model="outTemp" label-position="right" label-width="70px" style='width: 400px; margin-left:50px;'>
                      <el-form-item label="收款账户编号">
                        <el-input v-model="outTemp.PaymentID"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogDeleteVisible = false">取 消</el-button>           
                      <el-button type="primary" @click="handleDeleteSubmit">确 定</el-button>
                    </div>
              </el-dialog>
              
            </div>
        </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>

  import {api} from '@/global/api'
  import Vue from 'vue'
  import {export_json_to_excel} from '@/vendor/Export2Excel';//导出
  
  export default {
      data () {
          return {
            activeName2: 'first',
            IntableList: null,
            OuttableList:null,
            //入库
            inTemp: {
              "number":"" ,
              "ID": 22,
              "spbh":"" ,
              "name":"",
              "dw":"",
              "ck":"",
              "quantity":"",
              "rkdj":"",
              "rkje":"",
              "bz":""
            }, 
            outTemp: {
              "number":"" ,
              "PaymentID": "00",
              "AccountName":"" ,
              "ways":"",
              "money":"",
              "note":""
            },         
            IndialogCreatVisible: false,//入库
            IndialogEditVisible: false,

            dialogCreatVisible: false,//出库
            dialogEditVisible: false,
            dialogDeleteVisible:false,
          }
      },
      mounted() {
        var vm = this;
        vm.getData1();//入库
        vm.getData();//出库
      },
      methods:{
       // -------------入库-------------
        getData1 () {
         this.$http.get(api.kfData).then(function (response) {
           console.log(response)
           console.log('这是我们需要的json数据', response.data.IntableData)
           this.IntableList = response.data.IntableData;
         }, function (response) {
           alert('请求失败了')
         })
        },
       //添加
        InhandleCreate() {      
          this.IndialogCreatVisible = true;
        },
        //编辑
        InhandleEdit(){
          this.IndialogEditVisible = true;
        },
        //新增提交
        InhandleCreateSubmit(){
          var vm = this;         
          var flag=0;   
          for(var intablelist of vm.IntableList){
           console.log('进入循环flag',flag)
            if(vm.inTemp.spbh!=intablelist.spbh){
                console.log('不相等的时候商品编号',intablelist.spbh)
                flag++;
              }
            }
            console.log("退出if后flag",flag)
            if(flag==vm.IntableList.length){
            vm.IntableList.push(vm.inTemp);
            vm.inTemp=JSON.parse(JSON.stringify(vm.inTemp));
            }
            else{
              alert('商品编号重复了,请重新输入');
            }        
          this.IndialogCreatVisible = false;
        },
        //编辑提交
        InhandleEditSubmit(){
          var vm = this;          
          var flag=0;
          for(var intablelist of vm.IntableList){
            if(vm.inTemp.spbh==intablelist.spbh){
              var index=vm.IntableList.indexOf(intablelist)
              console.log("当前索引号",index);
              Vue.set(vm.IntableList,index,vm.inTemp);//全部更新并写回表单中
              vm.inTemp=JSON.parse(JSON.stringify(vm.inTemp));
              flag++;    
            }
          }
          if (flag==0) {alert("这个商品编号不存在，请重新输入")};
          this.IndialogEditVisible = false;
        },
        // ------------出库----------------
        getData () {
          this.$http.get(api.kfData, {params: {'key': this.inputValue}}).then(function (response) {
            console.log(response)
            console.log('这是我们需要的json数据', response.data.OuttableData)
            this.OuttableList = response.data.OuttableData;
          }, function (response) {
            alert('请求失败了')
          })
        },
        handleCreate() {      
          this.dialogCreatVisible = true;
        },
        handleEdit(){
        this.dialogEditVisible = true;
        },
        handleDelete(){
        this.dialogDeleteVisible = true;
        },
        //新增提交
        handleCreateSubmit(){
          var vm = this;         
           var flag=0;   
           for(var outtablelist of vm.OuttableList){
           console.log('进入循环flag',flag)
            if(vm.outTemp.PaymentID!=outtablelist.PaymentID){
                console.log('不相等的时候PaymentID',outtablelist.PaymentID)
                flag++;
              }
            }
            console.log("退出if后flag",flag)
            if(flag==vm.OuttableList.length){
            vm.OuttableList.push(vm.outTemp);
            vm.outTemp=JSON.parse(JSON.stringify(vm.outTemp));
            }
            else{
              alert('ID重复了,请重新输入');
            }        
          this.dialogCreatVisible = false;
        },
         //编辑提交
        handleEditSubmit(){
          var vm = this;          
          var flag=0;
          for(var outtablelist of vm.OuttableList){
            if(vm.outTemp.PaymentID==outtablelist.PaymentID){
              var index=vm.OuttableList.indexOf(outtablelist)
              console.log("当前索引号",index);
              Vue.set(vm.OuttableList,index,vm.outTemp);
              vm.outTemp=JSON.parse(JSON.stringify(vm.outTemp));
              flag++;    
            }
          }
          if (flag==0) {alert("这个收款账户编号不存在，请重新输入")};
          this.dialogEditVisible = false;
        },
        //删除提交
        handleDeleteSubmit(){
          var vm = this;          var flag=0;
          for(var outtablelist of vm.OuttableList){
          if(vm.outTemp.PaymentID==outtablelist.PaymentID){
            var index=vm.OuttableList.indexOf(outtablelist)
              console.log("当前索引号",index);
              vm.OuttableList.splice(index,1)
              vm.outTemp=JSON.parse(JSON.stringify(vm.outTemp));
              flag++;
          }         
        } 
        if (flag==0) {alert("这个收款账户编号不存在，请重新输入")};
        this.dialogDeleteVisible = false;
        },
        //导出
        handleDownload(){
           // console.log("表头已导出！（未实现）");
           let vm = this;

           require.ensure([], () => {
             // const { export_json_to_excel } = require('vendor/Export2Excel');
             const tHeader = ['商品编号', '商品名称', '采购公司', '数量', '入库单价(元)','入库金额(元)','备注'];
             const filterVal = ['spbh', 'name', 'dw', 'quantity', 'rkdj','rkje','bz'];
             const IntableList = vm.IntableList;
             const data = vm.formatJson(filterVal, IntableList);
             export_json_to_excel(tHeader, data, '导出的列表excel');
           })
        },
        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
      }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  .post1{
    margin:20px;
    position: absolute;
  }
  .post1 .el-tabs{
    margin: 20px;
  }
  .post1 .el-tab-pane{
    /*border: 1px solid;*/
    /*width: 900px;*/
  }
  .el-dialog--small {
      width: 41%;
  }
  .post1 .el-form-item{
    float: left;
    width: 400px;
  }
  .post1 .el-form-item label{
    width: 100px;
    text-align: left;
  }
  .post1 .el-form-item .el-select{
    width: 150px;
  }
  .post1 .el-form-item .el-input{
    width: 300px;
  }
  .post1 .divider{
    width: 900px !important;
    background: #20A0FF;
    color: #fff;
    clear: both;
  }
  .post1 .el-rate{
    padding-top: 7px;
  }
  .post1 .clear{
    clear: both;
    background: red;
  }
  .post1 .span2{
    padding-right: 20px;
  }
  .post1 .pane2 li{
    margin-bottom: 5px;
    height: 50px;
  }
  .post1 .span3{
    margin: 50px 0px 20px 0px;
    width: 900px !important;
    height: 30px;
    background: gray;
    color: #fff;
  }
  .post1 .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    
    .post1 .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .post1 .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    /*入库*/
    .inbox1 .el-dialog__body{
      position: relative;
      overflow: hidden;
    }
    .inbox2 .el-dialog__body{
      position: relative;
      overflow: hidden;
    }
</style>


