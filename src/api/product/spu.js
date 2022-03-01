// 这个文件是管理spu相关接口的
import request from '@/utils/request'

// 获取Spu列表的接口 GET /admin/product/{page}/{limit}  page,limit,category3Id
export const reqGetSpuList = (page,limit,category3Id)=>request({
    url:`/admin/product/${page}/${limit}`,
    method:'GET',
    params:{category3Id}
})

// 修改Spu时触发的三个接口
// 获取品牌列表下拉菜单 GET /admin/product/baseTrademark/getTrademarkList



// 获取平台中所有的销售属性（3个，颜色、版本、尺码） GET /admin/product/baseSaleAttrList




// 修改时，通过id查询某一个spu的信息 GET /admin/product/getSpuById/{spuId}


// 获取spu图片  GET /admin/product/spuImageList/{spuId}