<template>
    <el-container>
        <el-header>
            <el-button @click="getFundDetailList">搜索</el-button>
<!--            <el-button @click="goBaiDu">百度</el-button>-->
<!--            <router-link to="/login">跳转</router-link>-->
<!--            <el-col :span="6" :offset="6">-->
            <el-col>
                <el-input v-model="input" @change="getFundDetailList" clearable></el-input>
            </el-col>
<!--            <el-col :span="12" :offset="3">-->
            <el-col>
            <el-container>
<!--                    <el-col :gutter="0">-->
<!--                        <span class="demonstration">时间选择</span>-->
<!--                    </el-col>-->
                <el-col :gutter="0">
                    <el-date-picker
                            v-model="dateTime"
                            type="datetimerange"
                            :shortcuts="shortcuts"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-col>
            </el-container>
            </el-col>
        </el-header>
        <el-container>
            <el-main>
                <el-descriptions title="基金信息" v-for="value in dataList" :key="value">
                    <el-descriptions-item label="基金代码">{{value.code}}</el-descriptions-item>
                    <el-descriptions-item label="基金名称">{{value.name}}</el-descriptions-item>
                    <el-descriptions-item label="基金类型">{{value.type}}</el-descriptions-item>
                    <el-descriptions-item label="基金经理">{{value.manager}}</el-descriptions-item>
                    <el-descriptions-item label="当天日涨幅(净值)">{{value.expectGrowth}}</el-descriptions-item>
                    <el-descriptions-item label="周涨幅(净值)">{{value.lastWeekGrowth}}</el-descriptions-item>
                    <el-descriptions-item label="月涨幅(净值)">{{value.lastMonthGrowth}}</el-descriptions-item>
                    <el-descriptions-item label="三月涨幅(净值)">{{value.lastThreeMonthsGrowth}}</el-descriptions-item>
                    <el-descriptions-item label="六月涨幅(净值)">{{value.lastSixMonthsGrowth}}</el-descriptions-item>
                    <el-descriptions-item label="年涨幅(净值)">{{value.lastYearGrowth}}</el-descriptions-item>
                    <el-descriptions-item label="净值更新日期">{{value.expectWorthDate}}</el-descriptions-item>
                    <el-descriptions-item label="起购额度">{{value.buyMin}}</el-descriptions-item>
                </el-descriptions>
<!--                <div class="Echarts">-->
<!--                    <div id="main" style="width: 600px;height:400px;"></div>-->
<!--                </div>-->
                <div class="funds">
                    <div id="fund" style="width: 1200px;height:800px;"></div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import { getWeather } from "@/api/weather";
import { getFundDetailList } from "@/api/fund/fundDetailList";

export default {
    name: 'Index',
    props: {
        msg: String
    },
    data() {
        return {
            input: '请输入内容code',
            time: false,
            response: {
                data:[]
            },
            dataList: [],
            netWorthData:[],
            timeDate:[],    // 日期
            netWorth:[],    // 单位净值
            Increase:[],    // 净值涨幅
            fundName:'',    // 基金名称
            shortcuts: [
                {
                    text: '最近一周',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                        return [start, end]
                    },
                },
                {
                    text: '最近一个月',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                        return [start, end]
                    },
                },
                {
                    text: '最近三个月',
                    value: () => {
                        const end = new Date()
                        const start = new Date()
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                        return [start, end]
                    },
                },
            ],
            dateTime: ["2021-01-01"],

        };
    },
    methods: {
        // 测试天气接口
        getTest() {
            let params = {
                city: "上海"
            };
            getWeather(params)
                .then(response => {
                    // success
                    console.log(response);
                    console.log("----------");
                    console.log(process.env.NODE_ENV);
                })
                .catch(error => {
                    // error
                    console.log(error);
                });
        },
        goBaiDu()
        {
            let shell = require('electron').shell
            shell.beep()
            shell.showItemInFolder('D:\\electron\\leeks')
            // shell.openPath('D:\\electron\\leeks\\test.txt')
            // shell.openExternal('https://www.baidu.com')
        },
        //时间转换(js将 “2021-07-06T06:23:57.000+00:00” 转换为年月日时分秒)
        transformTimestamp(timestamp) {
            let a = new Date(timestamp).getTime();
            const date = new Date(a);
            const Y = date.getFullYear() + '-';
            const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            // const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            // const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            // const s = date.getSeconds(); // 秒
            // const dateString = Y + M + D + h + m;
            const dateString = Y + M + D;
            // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
            return dateString;
        },
        // 获取基金详情接口
        getFundDetailList() {
            let now = new Date();
            let startDate = this.dateTime[0];
            // let endDate = this.dateTime[1];
            let endDate = now.toLocaleDateString()
            endDate = endDate.replace(/\//g,"-");
            endDate = this.transformTimestamp(endDate) // 2021-07-06 14:23

            if (startDate == undefined) {
                startDate = new Date()
            }else {
                startDate = this.transformTimestamp(startDate) // 2021-07-06 14:23
            }
            console.log(startDate)


            // if (endDate == undefined) {
            //     endDate = now.toLocaleDateString()
            //     endDate = endDate.replace(/\//g,"-");
            //     console.log(endDate)
            //     // endDate = now.getDate()
            //     // var myDate = new Date(); //获取系统当前时间
            //     // this.dateFtt("yyyy-MM-dd hh:mm:ss", myDate);
            //     // endDate = this.dateFtt("yyyy-MM-dd hh:mm:ss", now);
            //     // endDate = '2021-12-10';
            // }

            let params = {
                "code": this.input,
                "startDate" : startDate,
                "endDate" : endDate,
            };
            getFundDetailList(params)
                .then(response => {
                    // success
                    this.dataList = response.data.data;
                    // 处理净值数据
                    this.tidyData(this.dataList[0].netWorthData)
                    this.fundName = this.dataList[0].name
                    this.myFunds()     // 图表重新整理
                })
                .catch(error => {
                    // error
                    console.log(error);
                });
        },
        tidyData(arr)
        {
            // 日期
            let timeDate = arr.map(function(item){
                return item[0];
            });
            // 单位净值
            let netWorth = arr.map(function(item){
                return item[1];
            });
            // 净值涨幅
            let Increase = arr.map(function(item){
                return item[2];
            });
            // 每份分红
            let Dividends = arr.map(function(item){
                return item[3];
            });
            let data = new Array();
            this.timeDate = data['timeDate'] = timeDate;
            this.netWorth = data['netWorth'] = netWorth;
            this.Increase = data['Increase'] = Increase;
            this.Dividends = data['Dividends'] = Dividends;

            return data;
        },
        myEcharts(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('main'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        myFunds(){
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('fund'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: this.fundName
                },
                tooltip: {},
                legend: {
                    data:['净值']
                },
                xAxis: {
                    type: 'category',
                    // data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    data: this.timeDate
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: '单位净值',
                        type: 'line',
                        data: this.netWorth
                    },
                    {
                        name: '净值涨幅',
                        type: 'line',
                        // stack: 'Total',
                        data: this.Increase
                    },
                    {
                        name: '每份分红',
                        type: 'line',
                        // stack: 'Total',
                        data: this.Dividends
                    },
                ]
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        dateFtt(fmt, date) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
         now_time() {
            var myDate = new Date(); //获取系统当前时间
            this.dateFtt("yyyy-MM-dd hh:mm:ss", myDate);
        }
    },
    mounted() {
        // this.myEcharts();
        // this.myFunds();
        // let remote = window.require('electron').remote
    },
    beforeMount: function () {
        this.dateTime[1] = new Date();
    },
}
</script>
<style>

</style>