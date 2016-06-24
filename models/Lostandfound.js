var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 失物招领 Model
 * ==========
 */
var lostandfound = new keystone.List('Lostandfound', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '失物招领',
	plural: '失物招领'
});
lostandfound.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	state: { type: Types.Select, options: '丢失, 找到', default: '丢失', index: true,emptyOption: false ,label: '状态'},
	examine: { type: Types.Select, options: '审核中, 通过, 未通过', default: '审核中', index: true,emptyOption: false ,label: '审核状态'},
	content: { type: String,  label: '丢失/捡到位置'},
	author: { type: String, label: '联系人'},
	contact: { type: String,label: '联系方式'},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return item.property+"/lostandfound/"+item.title+"_"+item.state+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
	openid: { type: String, index: true ,label: 'openid'},
	
});
lostandfound.defaultColumns = 'title, state|20%, publishedDate|20%, contact|20%';
lostandfound.register();
