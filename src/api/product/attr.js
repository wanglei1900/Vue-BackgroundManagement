// 这是平台属性管理模块请求文件
import request from '@/utils/request'

// 获取一级分类的接口  GET /admin/product/getCategory1
export const reqCategory1List = () => request({
    url: '/admin/product/getCategory1',
    method: 'GET'
})
//  获取一级分类的接口  GET /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id)=>request({
    url:`/admin/product/getCategory2/${category1Id}`,
    method:'GET'
})
// 获取三级分类数据接口 GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id)=> request({
    url:`/admin/product/getCategory3/${category2Id}`,
    method:'GET'
})
// 获取平台属性的数据  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList =(category1Id,category2Id,category3Id)=>request({
    url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method:'GET'
})