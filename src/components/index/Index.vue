<template>
    <el-container>
        <el-header>
            <el-col :span="6" :offset="6">
                <el-input v-model="input" @change="getFundDetailList" clearable></el-input>
            </el-col>
            <el-col :span="12" :offset="3">
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
            <el-aside>
                aside
            </el-aside>
            <el-main>
                <el-descriptions title="基金信息" v-for="value in dataList" :key="value">

                    <el-descriptions-item label="基金代码">{{value.code}}</el-descriptions-item>
                    <el-descriptions-item label="基金名称">{{value.name}}</el-descriptions-item>
                    <el-descriptions-item label="基金类型">{{value.type}}</el-descriptions-item>
                    <el-descriptions-item label="基金经理">{{value.manager}}</el-descriptions-item>
                    <el-descriptions-item label="当天日涨幅">{{value.expectGrowth}}</el-descriptions-item>
<!--                    <el-descriptions-item label="备注">-->
<!--                        <el-tag size="small">学校</el-tag>-->
<!--                    </el-descriptions-item>-->
<!--                    <el-descriptions-item label="联系地址"-->
<!--                    >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item-->
<!--                    >-->
                </el-descriptions>
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
            dateTime: false,

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
        // 获取基金详情接口
        getFundDetailList() {
            let now = new Date();
            let startDate = this.dateTime[0];
            let endDate = this.dateTime[1];

            if (startDate == undefined) {
                startDate = "2021-01-01"
            }
            if (endDate == undefined) {
                endDate = now.getDate()
            }

            let params = {
                "code": this.input,
                "startDate" : startDate,
                "endDate" : endDate,
            };
            getFundDetailList(params)
                .then(response => {
                    // success
                    console.log(response);
                    this.dataList = response.data.data;
                    console.log('---');
                    console.log(this.dataList);
                })
                .catch(error => {
                    // error
                    console.log(error);
                });
        },
    }
}
</script>
<style>

</style>