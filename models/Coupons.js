var keystone = require('keystone'),
    Types = keystone.Field.Types;
/**
 * 优惠 Model
 * ==========
 */
var coupons = new keystone.List('Coupons', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: '优惠',
    plural: '优惠'
});
coupons.add({
    title: { type: String, required: true, default: '标题' ,label: '标题'},
    store: { type: String,  label: '商家'},
    contact: { type: String,label: '联系方式'},
    address: { type: String,label: '地址'},
    property: { type: Types.Relationship, ref: 'User', index: true ,label: '所属物业'},
    type: { type: Types.Relationship,ref: 'Coupons_type',label: '类型'},
    details: { type: String,label: '详情'},
    number: { type: String,label: '券编号'},
    mark: { type: String,label: '商家标记'},
    validDate: { type: String,label: '有效日期'},
    image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
        return item.property+"/coupons/"+item.title+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
    } ,format: function(item, file){
        return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
    }},
    publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
});
coupons.defaultColumns = 'title,publishedDate|20%, contact|20%';
coupons.register();
