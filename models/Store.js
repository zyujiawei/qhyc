var keystone = require('keystone'),
    Types = keystone.Field.Types;

var store = new keystone.List('Store', {
    map: {
        name: 'title'
    },
    autokey: {
        path: 'slug',
        from: 'title',
        unique: true
    },
    singular: '商家',
    plural: '商家'
});
store.add({
    title: {
        type: String,
        required: true,
        default: '商家名称',
        label: '商家名称'
    },
    property: {
        type: Types.Relationship,
        ref: 'User',
        index: true,
        label: '物业'
    },
    type: {
        type: Types.Relationship,
        ref: 'StoreType',
        index: true,
        label: '店铺类别'
    },

    image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
        return item.property+"/Store/"+item.title+"_"+item.state+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
    } ,format: function(item, file){
        return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
    }},

    examine: { type: Types.Select, options: '审核中, 通过, 未通过', default: '审核中', index: true,emptyOption: false ,label: '审核状态'},
    
    contact: {
        type: String,
        index: true,
        label: '联系人'
    },
    telephone: {
        type: String,
        index: true,
        label: '联系电话'
    },
    cellphone: {
        type: String,
        index: true,
        label: '手机'
    },
    qq: {
        type: String,
        index: true,
        label: '联系QQ'
    },
    address: {
        type: String,
        index: true,
        label: '商家地址'
    },
    detail: {
        type: String,
        index: true,
        default: '该商家很懒,未添加详情。',
        label: '商家详情'
    },
    publishedDate: {
        type: Types.Date,
        index: true,
        format: 'YYYY-MM-DD',
        label: '发布日期',
        default: Date.now
    },
    businessUser: {
        type: Types.Relationship,
        ref: 'BusinessUser',
        index: true,
        label: '商家用户'
    },
});
store.defaultColumns = 'title, type|20%, address|20%, detail|20%';
store.register();
