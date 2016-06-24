var keystone = require('keystone'),
    Types = keystone.Field.Types;

var shopping = new keystone.List('Shopping', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: '购物车表',
    plural: '购物车表'
});
shopping.add({
    storeName: { type: String, required: true, default: '商家名称' ,label: '商家名称'},
    image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
        return item.property+"/shopping/"+item.title+"_"+item.telephone+"_"+item.cellphone+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
    } ,format: function(item, file){
        return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
    }},
    contact: { type: String, index: true ,label: '商家联系电话'},
    storeID: { type: String, default: '商家ID' ,label: '商家ID'},
    userID: { type: String, default: '用户ID' ,label: '用户ID'},
    commodityID: { type: String, default: '商品ID' ,label: '商品ID'},
    title: { type: String, default: '商品名称' ,label: '商品名称'},
    number: {type: Types.Number, default: '0' ,label: '商品数量'},
    money: { type: Types.Money, default: '0' ,label: '商品价格'},
    publishedDate: { type: Types.Datetime, index: true, label: '日期',default: Date.now },
});
shopping.defaultColumns = 'title, address|20%, detail|20%';
shopping .register();