<template>
    <el-col :gutter="0">
        <el-date-picker
                v-model="value2"
                type="datetimerange"
                :shortcuts="shortcuts"
                @change="timeChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
        >
        </el-date-picker>
    </el-col>
    <el-button @click="order_sort(0)">涨幅正序</el-button>
    <el-button @click="order_sort(1)">涨幅倒序</el-button>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="date"
                label="日期">
        </el-table-column>
        <el-table-column
                prop="code"
                label="基金代码">
        </el-table-column>
        <el-table-column
                prop="name"
                label="基金名称">
        </el-table-column>
        <el-table-column
                prop="manager"
                label="基金经理">
        </el-table-column>
        <el-table-column
                prop="fundScale"
                label="基金规模">
        </el-table-column>
        <el-table-column
                prop="total_worth"
                label="涨跌幅">
        </el-table-column>
    </el-table>
    <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :total=total>
    </el-pagination>
</template>
<script>
    import { getLeeksList } from "@/api/leeks/search";
    export default {
        name: 'Search',
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: '',
                value2: '',
                start_time: '',
                end_time: '',
                page: 1,
                limit: 0,
                pos: 10,
                order: 0,
                total: 10,
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
                tableData: []
            }
        },
        methods: {
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.limit = (val - 1) * this.pos;
                this.searchLeeks()
            },
            order_sort(val)
            {
                this.order = val
                this.searchLeeks()
            },
            // 获取基金详情(涨跌幅总计列表)
            searchLeeks(){
                let params = {
                    "pos": this.pos,
                    "limit": this.limit,
                    "order": this.order,
                    "start_time" : this.start_time,
                    "end_time" : this.end_time,
                };
                getLeeksList(params)
                    .then(response => {
                        // success
                        console.log(response)
                        this.tableData = response.data.list
                        this.total = response.data.total / this.limit
                    })
                    .catch(error => {
                        // error
                        console.log(error);
                    });
            },
            timeChange(val) {
                this.start_time = this.transformTimestamp(val[0]);
                this.end_time = this.transformTimestamp(val[1]);
                this.searchLeeks()
                // console.log(`时间:`+ this.start_time);
                // console.log(`时间:`+ this.end_time);
                // console.log(`时间: ${val}`);
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
        }
    }
</script>
<style>

</style>