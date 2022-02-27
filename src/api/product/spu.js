// 这个文件是管理spu相关接口的
import request from '@/utils/request'

// 获取Spu列表的接口 GET /admin/product/{page}/{limit}  page,limit,category3Id
export const reqGetSpuList = (page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit}`,
    method:'GET',
    params:{category3Id}
})