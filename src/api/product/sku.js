// 这个文件是管理sku相关接口的
import request from '@/utils/request'

// 获取sku列表并进行展示  GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'GET'
})

// spu上架 GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({
    url: `/admin/product/onSale/${skuId}`,
    method: 'GET'
})

// spu下架 GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: 'GET'
})

// 删除sku信息 DELETE /admin/product/deleteSku/{skuId}
export const reqDeleteSku = (skuId)=>request({
    url:`/admin/product/deleteSku/${skuId}`,
    method:'DELETE'
})

//  获取sku列表数据的接口 GET /admin/product/getSkuById/{skuId}
export const reqGetSkuBySpuId = (skuId) => request({
    url:`/admin/product/getSkuById/${skuId}`,
    method:'GET'
})

