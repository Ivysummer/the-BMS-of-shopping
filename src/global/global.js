import Vue from 'vue';
import { Loading } from 'element-ui';

export  const global = {
	/*
	 * 统一接口处理：get请求方法封装。this.$http.get(url, [options])
	 * @param url { String } -必选 接口url
	 * @param options { Object } -必选（参数） 含官方的所有options对象。传参为{params:{key:11}}
	 * @param sucCb { Function } -必选 成功回调
	 * @param errorCb { Function } -可选 失败回调
	 * @param isLoading { Boolean } -可选 是否显示加载状态
	 * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
	 */
	get:function( url, options = {}, sucCb, errorCb, isLoading = true, isLogin ){
	    if(!url){
	        console.log('请传接口url');
	        return false ;
	    }
	    //默认laoding状态  2018.4.24
	    // var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;

	    //遮罩层
	    if(isLoading){
	        var loadingInstance = Loading.service({text:"拼命加载中..."});
	    }
	    Vue.http.get(url, options).then((response) => {
	        // 响应成功回调
	        setTimeout(function(){
	        	sucCb(response);
	        	if(isLoading){
	           		loadingInstance.close();
	        	}
	        },1000)
	        
	        
	    }, (response) => {
	        // 响应错误回调
	        errorCb(response);
	        if(isLoading){
	           loadingInstance.close();
	        }
	    })
	},

	 /**
         * 统一接口处理：post请求方法封装。this.$http.get(url, [options])
         * @param url { String } -必选 接口url
         * @param body { Object } -必选 含官方的所有body对象，可为null。传参时不需要参数名，例如body为{key:11}
         * @param options { Object } -必选 含官方的所有options对象，可为null。传参为{params:{key:11}}
         * @param sucCb { Function } -必选 成功回调
         * @param errorCb { Function } -可选 失败回调
         * @param isLoading { Boolean } -可选 是否显示加载状态
         * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
         */
        post:function( url,body,options,sucCb,errorCb,isLoading = true,isLogin ){
            if(!url){
                console.log('接口url不能为空！');
                return false ;
            }
            //lss 2017-6-28 补默认laoding状态
            // var isLoading = isLoading===undefined ||(isLoading!==undefined && isLoading !== false )? true : false;  

            //遮罩层
            if(isLoading){
                var loadingInstance = Loading.service({text:"拼命加载中..."});
            }
            Vue.http.post(url,body,options).then((response) => {
                // 响应成功回调
                //console.log('成功回调')
                sucCb(response);
                if(isLoading){
                   loadingInstance.close();
                }
                 
            }, (response) => {
                // 响应错误回调
                //console.log('失败回调')
                errorCb(response);
                if(isLoading){
                   loadingInstance.close();
                }
            })
        },

        /**
         * 参考author lss
         * 日期格式化,传入为毫秒数,转出时间格式为 ：2018-4-25 12:00:00
         * @objD 必填，格式为毫秒数
         */
        formatDate: function (objD) {
            if (!objD) {
                return '';
            }

            objD = new Date(objD);
            var str;
            var yy = objD.getYear();
            if (yy < 1900) yy = yy + 1900;
            var MM = objD.getMonth() + 1;
            if (MM < 10) MM = '0' + MM;
            var dd = objD.getDate();
            if (dd < 10) dd = '0' + dd;
            var hh = objD.getHours();
            if (hh < 10) hh = '0' + hh;
            var mm = objD.getMinutes();
            if (mm < 10) mm = '0' + mm;
            var ss = objD.getSeconds();
            if (ss < 10) ss = '0' + ss;
            str = yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss;
            return (str);
        },
        /**
         * 参考author lss
         * 日期格式化,传入为毫秒数,转出时间格式为 ：2018-4-25
         * @objD 必填，格式为毫秒数
         */
        formatDate2: function (objD) {
            if (!objD) {
                return '';
            }
            objD = new Date(objD);
            var str;
            var yy = objD.getYear();
            if (yy < 1900) yy = yy + 1900;
            var MM = objD.getMonth() + 1;
            //if(MM<10) MM = '0' + MM;
            var dd = objD.getDate();
            //if(dd<10) dd = '0' + dd;
            //去掉0 我的圈子 加入圈子，布局放不下。。
            str = yy + "-" + MM + "-" + dd;
            return (str);
        },
		
        
        /**
         * 获取url参数
         */
        getUrlFn: function () {
            var querystr = window.location.href.split("?"),
                // var querystr = "http://xxxx.com/recharge.html?mid=&version=7701&from=music".split("?"),
                GETs = "",
                GET = "";
            if (querystr[1]) {
                GETs = querystr[1].split("&");
                GET = [];
                for (i = 0; i < GETs.length; i++) {
                    tmp_arr = GETs[i].split("=");
                    var key = tmp_arr[0];
                    GET[key] = tmp_arr[1];
                }
            }
            return GET;
            // return querystr[1];
        },
        /**
         * 获取url data参数。aa.html?data={}
         */
        getUrlData: function () {
            var purl = window.location.href;
            purl = purl.substr(purl.indexOf("?") + 1);
            var urlData = JSON.parse(decodeURI(purl.substr(purl.indexOf("=") + 1)));

            return urlData;
        },
};