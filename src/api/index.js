// 统一暴露api接口函数的文件
import {reqTradeMarkList} from '@/api/product/tradeMark'
import attr from '@/api/product/attr'
import sku from '@/api/product/sku'
import spu from '@/api/product/spu'

export default{
    reqTradeMarkList,
    attr,
    sku,
    spu
}

