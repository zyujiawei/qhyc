var keystone = require('keystone'),
    Types = keystone.Field.Types;
/**
 * 优惠 Model
 * ==========
 */
var user_Coupons = new keystone.List('user_Coupons', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: '用户优惠券',
    plural: '用户优惠券'
});
user_Coupons.add({
    title: { type: String, required: true, default: '标题' ,label: '标题'},
    store: { type: String,  label: '商家'},
    contact: { type: String,label: '联系方式'},
    address: { type: String,label: '地址'},
    number: { type: String,label: '券编号'},
    user_number: { type: String,label: '用户编码'},
    details: { type: String,label: '详情'},
    validDate: { type: String,label: '有效日期'},
    type: { type: String,label: '类型'},
    state: { type: String,label: '使用状态'},
    use: { type: String,label: '使用商家'},
    image: { type: String,label: '图片'},
    publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
    openid: { type: String, index: true ,label: 'openid'},
});
user_Coupons.defaultColumns = 'title, publishedDate|20%, contact|20%';
user_Coupons.register();
