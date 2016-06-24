var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 故障报修 Model
 * ==========
 */
var fixing = new keystone.List('Fixing', {
	map: { name: 'item' },
	autokey: { path: 'slug', from: 'item', unique: true },
	singular: '故障报修',
	plural: '故障报修'
});
fixing.add({
	item: { type: String, required: true, default: '报修物品',label: '报修物品'},
	examine: { type: Types.Select, options: '审核中, 处理中, 已处理,未处理', default: '审核中', index: true,emptyOption: false ,label: '审核状态'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	location: { type: String,label: '报修位置'},
	author: { type: String, label: '报修人'},
	contact: { type: String, index: true ,label: '联系方式'},
	content: { type: String,label: '描述'},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return item.property+"/fixing/"+item.item+"_"+item.state+"_"+item.author+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	openid: { type: String, index: true ,label: 'openid'},
});
fixing.defaultColumns = 'item, location, description, author, publishedDate';
fixing.register();
