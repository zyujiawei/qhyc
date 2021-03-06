var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 房屋租售 Model
 * ==========
 */
var house = new keystone.List('House', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '房屋租售',
	plural: '房屋租售'
});
house.add({
	title: { type: String, required: true, default: '商家名称' ,label: '商家名称'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return item.property+"/house/"+item.title+"_"+item.telephone+"_"+item.cellphone+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	contact: { type: String, index: true ,label: '联系人'},
	telephone: { type: String, index: true ,label: '联系电话'},
	cellphone: { type: String, index: true ,label: '手机'},
	qq: { type: String, index: true ,label: '联系QQ'},
	address: { type: String, index: true ,label: '商家地址'},
	detail : { type: String, index: true , default: '该商家很懒,未添加详情。' ,label: '商家详情'},
	publishedDate: { type: Types.Date, index: true, format: 'YYYY-MM-DD',label: '发布日期' },
});
house.defaultColumns = 'title, address|20%, detail|20%';
house.register();
