<template>
  <div class="readme-container">
        <div class="notice">  
          <h3 class="title">最新通知：</h3>
          <marquee behavior="" direction="">
             系统说明：登录，注册，库房管理（入库单， 出库单，库存分配 库存余额表），商品管理（商品库存， 商品成本， 商品属性管理，商品列表），订单管理（订单报表， 所有订单， 所属员工， 订单发货， 生成发货订单），财务管理（记录出款和入款， 计算一段时间的利润），客户管理（客户基本信息， 客户销售， 客户订单管理， 客户关系管理）， 员工管理（员工基本信息， 员工权限， 入职新员工， 员工销售额管理）
          </marquee> 
        </div>
        <!-- <router-link to="./echarts"><img src="../.././assets/sale-more.jpg"><span>查看更多</span></router-link> -->
        <ul class="headData">
          <router-link to="/index/user/echarts">
            <li class="card count">
              <div class="order">
                <p class="todayOrd">今日订单数</p>
                <p class="num">11320</p>
              </div>
              <div class="icon">
                <i class="fa fa-line-chart" style="font-size: 19px;"></i>
              </div>
            </li>
          </router-link>

          <router-link to="/index/order/index">
            <li class="card money">
              <div class="order">
                <p class="todayMoney">今日交易金额</p>
                <p class="num">10690402</p>
              </div>
              <div class="icon">
                <i class="fa fa-usd" style="font-size: 19px;"></i>
              </div>
            </li>
          </router-link>

          <router-link to="/index/user/echarts">
            <li class="card count">
              <div class="order">
                <p>昨日订单数</p>
                <p class="num">11220</p>
              </div>
              <div class="icon">
                <i class="fa fa-line-chart" style="font-size: 19px;"></i>
              </div>
            </li>
          </router-link>
          
          <router-link to="/index/order/index">
            <li class="card money">
              <div class="order">
                <p>昨日交易金额</p>
                <p class="num">10630408</p>
              </div>
              <div class="icon">
                <i class="fa fa-usd" style="font-size: 19px;"></i>
              </div>
            </li>
          </router-link>

        </ul>
        <!-- 订单报表展示 -->
        <div id="chartLine" style="width:800px; height:500px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {

    data() {
      return {
        chartLine: null,
      }
    },
    methods:{

      drawLineChart() {
          this.chartLine = echarts.init(document.getElementById('chartLine'));
          this.chartLine.setOption({
              title: {
                  text: '商场部分热销商品近一周的销售盈利情况',
                  left:"1%"
              },
              tooltip: {
                  trigger: 'axis'

              },
              legend: {
                  data: ['肉类', '零食类', '奶制品'],
                  right:"3%"
              },
              grid: {
                  left: '10%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              },
              yAxis: {
                  type: 'value'
              },
              series: [
                  {
                      name: '肉类',
                      type: 'line',
                      stack: '总量',
                      data: [120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                      name: '零食类',
                      type: 'line',
                      stack: '总量',
                      data: [220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                      name: '奶制品',
                      type: 'line',
                      stack: '总量',
                      data: [820, 932, 901, 934, 1290, 1330, 1320]
                  }
              ]
          });
      },
      drawCharts() {
        this.drawLineChart()
      },
    },
    mounted: function () {
            this.drawCharts()
        },
    updated: function () {
            this.drawCharts()
        }
  };
</script> 


<style type="text/css">
.readme-container{

}
/*跑马灯*/
.notice {
  margin-left: 20px;
  width: 96%;
  overflow: hidden;
  background: #FCFCFC;
  padding: 10px;
}
.readme-container .title {
  padding-bottom: 10px;
  color: red;
}
/*订单通告栏*/
ul.headData{
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  margin-left: 120px;
}
ul a{
  font-size: 18px;
}
/*四个提示卡*/
li.card{
  float: left;
  margin-left: 30px;
  list-style: none;
  border: 1px solid #e1e1e1;
  width: 200px;
  height: 60px;
  color: white;
}
.card.count{
  background-color:#95CACA;
}
.card.money{
  background-color:#CDCD9A;
}
/*左侧说明*/
.order{
  float: left;
  margin-left: 30px;
  margin-top: 10px;
}

p.todayOrd{

}
p.num{
  text-align: center;
}
/*右侧图标*/
.icon{
  float: right;
}
.icon i{
  font-size: 29px;
  margin-top: 16px;
  margin-right: 20px;
}
#chartLine{
  margin: 100px 150px;

}
</style>
