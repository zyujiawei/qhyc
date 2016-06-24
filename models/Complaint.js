var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * 投诉建议 Model
 * ==========
 */
var complaint = new keystone.List('Complaint', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '投诉建议',
	plural: '投诉建议'
});
complaint.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	state: { type: Types.Select, options: '投诉,建议', default: '投诉',emptyOption: false, index: true },
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	author: { type: String, index: true, label: '投诉人'},
	contact: { type: String, index: true ,label: '联系方式'},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return item.property+"/complaint/"+item.title+"_"+item.state+"_"+item.author+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
	content: { type: String, wysiwyg: true, height: 150 ,label: '内容'},
	openid: { type: String, index: true ,label: 'openid'},
	
});
complaint.defaultColumns = 'title, author|20%, contact|20%';
complaint.register();
