//接口配置

//把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
const config = require('../../config');

let url = {
    apiUrl: "/ccp-web/api", //接口路径
    //ctxPath: "/ccp-web/dist", //tomcat服务dist目录
    ctxPath: "/dist", //node服务dist目录

    //staticPath:config.dev.staticPath,       //开发环境静态资源路径
    // 条件 ? 结果1 : 结果2 //三元运算符，表示条件为true时，等式的结果就为结果1（'./'），否则为结果2('/static/')。
    // development为开发环境（npm run dev），另外一个production是生产环境（）
    // 生产环境时staticPath的值为'./'，开发环境时staticPath的值为'/static/'。
    staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath
};

//----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------

let nodeApiBaseUrl = 'http://localhost:3000';

export const api = {
    //模拟接口（json数据）
            'chakan':url.staticPath+'dataJson/chakan.json',
            'customerOrder':url.staticPath+'dataJson/customerOrder.json',
            'cwData_in':url.staticPath+'dataJson/cwData_in.json',
            'cwData_out':url.staticPath+'dataJson/cwData_out.json', 
            'cwData_out2':url.staticPath+'dataJson/cwData_out2.json', 
            'goods':url.staticPath+'dataJson/goods.json',
            'kfData':url.staticPath+'dataJson/kfData.json', 
            'power':url.staticPath+'dataJson/power.json',   
            'productInfo':url.staticPath+'dataJson/productInfo.json',   
            'sale':url.staticPath+'dataJson/sale.json',   
            // 'userInfo':url.staticPath+'dataJson/userInfo.json',
            // 'userInfo2':url.staticPath+'dataJson/userInfo2.json',   
            'weather_mini':url.staticPath+'dataJson/weather_mini.json',

            //商品列表请求的json文件
            'productList':url.staticPath+'testDataJson/productList.json', 
              
            //订单管理请求的json文件
            'logisticsCompany':url.staticPath+'testDataJson/logisticsCompany.json', 
            'orderColleague':url.staticPath+'testDataJson/orderColleague.json',   
            'orderInfo':url.staticPath+'testDataJson/orderInfo.json',   
            'close':url.staticPath+'testDataJson/close.json',
            'sended':url.staticPath+'testDataJson/sended.json',
            'success':url.staticPath+'testDataJson/success.json', 
            'waitedPay':url.staticPath+'testDataJson/waitedPay.json',
            'waitedSend':url.staticPath+'testDataJson/waitedSend.json',
            'echartsJson':url.staticPath+'testDataJson/echartsJson.json', 
        
        //以下接口为实际接口，需要下载node项目源码 
            "addUser": nodeApiBaseUrl+"/api/addUser",       //员工信息添加
            "queryUser": nodeApiBaseUrl+"/api/queryUser",     //员工信息列表
            "queryUserItem": nodeApiBaseUrl+"/api/queryUserItem",     //员工单条详情
            // "userUpdate": nodeApiBaseUrl+"/api/userUpdate",   //员工信息更新
            "delUser": nodeApiBaseUrl+"/api/delUser",       //员工信息删除

    }
