var keystone = require('keystone'),
    Types = keystone.Field.Types;
var households = new keystone.List('Households', {
    map: { name: 'openid' },
    autokey: { path: 'slug', from: 'openid', unique: true },
    singular: '小区用户',
    plural: '小区用户'
});
households.add({
    openid: { type: String, index: true , default: 'id' ,label: 'id'},
    nickName: { type: String, index: true , default: '用户昵称' ,label: '用户昵称'},
    sex: { type: String, index: true , default: '用户性别' ,label: '用户性别'},
    city: { type: String, index: true , default: '所属城市' ,label: '所属城市'},
    procince: { type: String, index: true , default: '所属省份' ,label: '所属省份'},
    country: { type: String, index: true , default: '所属国家' ,label: '所属国家'},
    headImgurl: { type: String, index: true , default: '用户头像路径' ,label: '用户头像路径'},
    address: { type: String, index: true ,label: '地址'},
    district: { type: String , index: true ,label: '行政区'},
    property: { type: String , index: true ,label: '物业'},
    area: { type: String , index: true ,label: '区域'},
    building: { type: String , index: true ,label: '栋单元'},
    phone:{ type: String , index: true ,label: '手机号'},
    name:{ type: String , index: true ,label: '真实姓名'},
});

households.defaultColumns = 'openid,nickName,property';
households.register();
//区域Area
//栋Building
//单元Unit