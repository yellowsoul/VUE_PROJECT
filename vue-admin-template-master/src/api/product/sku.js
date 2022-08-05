// sku模块
import request from '@/utils/request';

// sku列表的接口
// GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({url:`/admin/product/list/${page}/${limit}`,method:'get'});
