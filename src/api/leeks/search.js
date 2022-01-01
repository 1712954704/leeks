import request from "@/utils/request_leeks"

export function getLeeksList(params){
    return request({
        url: '/api/leeks/search',
        method: 'get',
        params
    })
}