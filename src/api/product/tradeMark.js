import request from '@/utils/request'
// 这个模块主要获取品牌管理数据的模块
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
})

// 处理添加品牌的操作     /admin/product/baseTrademark/save   POST  两个参数：品牌名称，品牌logo
// 对于新增的品牌，不需要传递ID，因为ID是由服务器生成

// 修改品牌的操作   /admin/product/baseTrademark/update   PUT   三个参数：id，品牌名称，品牌logo
// 切记，对于修改一个品牌的操作，前端代的参数需要带上id，你需要告诉服务器你修改的是哪一个品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    // 带给服务器的数据携带ID--修改
    if (tradeMark.id) {
        return request({ url: "/admin/product/baseTrademark/update", method: 'PUT', data: tradeMark })
    } else {
        return request({ url: "/admin/product/baseTrademark/save", method: 'POST', data: tradeMark })
    }
}

// 删除品牌操作那个      /admin/product/baseTrademark/remove/{id}     DELETE
export const reqDeleteTradeMark = (id) =>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'DELETE'
})

