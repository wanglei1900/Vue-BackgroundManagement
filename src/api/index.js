// 统一暴露api接口函数的文件
import * as trademark from '@/api/product/tradeMark'
import * as attr from '@/api/product/attr'
import * as sku from '@/api/product/sku'
import * as spu from '@/api/product/spu'

// 引入权限相关的文件
import * as user from "./acl/user"
import role from './acl/role'
import permission from './acl/permission'

export default{
    trademark,
    attr,
    sku,
    spu,
    user,
    role,
    permission
}

