var keystone = require('keystone'),
    Types = keystone.Field.Types;
    

var testUser = new keystone.List('TestUser', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true },
    singular: '小区用户',
    plural: '小区用户'
});

testUser.add({
    openid: { type: String, index: true , default: 'id' ,label: 'id'},
    nickName: { type: String, index: true , default: '用户昵称' ,label: '用户昵称'},
    sex: { type: String, index: true , default: '用户性别' ,label: '用户性别'},
    city: { type: String, index: true , default: '所属城市' ,label: '所属城市'},
    procince: { type: String, index: true , default: '所属省份' ,label: '所属省份'},
    country: { type: String, index: true , default: '所属国家' ,label: '所属国家'},
    headImgurl: { type: String, index: true , default: '用户头像路径' ,label: '用户头像路径'},
    property: { type: Types.Relationship, ref: 'User', filters: { email: 'zyujiawei@hotmail.com' } , index: true ,label: '物业'},





    title: { type: String, required: true, default: '小区名称' ,label: '小区名称'},
});

testUser.defaultColumns = 'title';
testUser.register();
