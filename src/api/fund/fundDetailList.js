import request from "@/utils/request"

export function getFundDetailList(params){
    return request({
        url: '/v1/fund/detail/list',
        method: 'get',
        params
    })
}