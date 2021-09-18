import axios from "axios"

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: 'http://wthrcdn.etouch.cn',
    baseURL: 'https://api.doctorxiong.club',
    timeout: 10000,
})

export default service