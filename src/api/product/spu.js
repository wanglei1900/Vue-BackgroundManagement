// 这个文件是管理spu相关接口的
import request from '@/utils/request'

// 获取Spu列表的接口 GET /admin/product/{page}/{limit}  page,limit,category3Id
export const reqGetSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'GET',
    params: { category3Id }
})

// 修改Spu时触发的四个接口

// 修改时，通过id查询点击的某一个spu的信息 GET /admin/product/getSpuById/{spuId}
export const reqGetSpuById = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'GET'
})

// 获取品牌列表下拉菜单 GET /admin/product/baseTrademark/getTrademarkList
export const reqGetTrademarkList = () => request({
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'GET'
})

// 获取spu图片  GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
})

// 获取平台中所有的销售属性（最多3个，颜色、版本、尺码） GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({
    url: '/admin/product/baseSaleAttrList',
    method: 'GET'
})

// 添加spuForm数据接口  POST /admin/product/saveSpuInfo
// 修改spuForm数据接口  POST /admin/product/updateSpuInfo
// 修改或者添加spuForm数据,两个接口的参数基本一致，唯一区别是携带的参数id
export const reqUpdateOrSaveSpuInfo = (spuInfo) => {
    if (spuInfo.id) {
        return request({ url: '/admin/product/updateSpuInfo', method: 'POST', data: spuInfo })
    } else {
        return request({ url: '/admin/product/saveSpuInfo', method: 'POST', data: spuInfo })
    }
}

// 删除spu  DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'DELETE'
})

// 重复了
/* // 获取spu图片列表 GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'GET'
}) */

// 获取销售属性列表 GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'GET'
})

// 获取attrInfoList GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET'
})

// 添加SKU的保存按钮 POST /admin/product/saveSkuInfo
export const reqSaveSkuInfo= (skuInfo) => request({
    url:'/admin/product/saveSkuInfo',
    method:'POST',
    data:skuInfo   
})

/* {
    "category3Id": 0,
    "createTime": "2022-03-10T14:13:38.165Z",
    "id": 0,
    "isSale": 0,
    "price": 0,
    "skuAttrValueList": [
      {
        "attrId": 0,
        "attrName": "string",
        "id": 0,
        "skuId": 0,
        "valueId": 0,
        "valueName": "string"
      }
    ],
    "skuDefaultImg": "string",
    "skuDesc": "string",
    "skuImageList": [
      {
        "id": 0,
        "imgName": "string",
        "imgUrl": "string",
        "isDefault": "string",
        "skuId": 0,
        "spuImgId": 0
      }
    ],
    "skuName": "string",
    "skuSaleAttrValueList": [
      {
        "id": 0,
        "saleAttrId": 0,
        "saleAttrName": "string",
        "saleAttrValueId": 0,
        "saleAttrValueName": "string",
        "skuId": 0,
        "spuId": 0
      }
    ],
    "spuId": 0,
    "tmId": 0,
    "weight": "string"
  } */

