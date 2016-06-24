var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Message  Model
 * ==========
 */
var Message = new keystone.List('Message', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '消息通知',
	plural: '消息通知'
});
Message.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	content: { type: Types.Textarea,  label: '消息内容'},
	author: { type: String, label: '联系人'},
	contact: { type: String,label: '联系方式'},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return "Message/"+item.title+"_"+item.state+"_"+item.contact+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
	openid: { type: String, index: true ,label: 'openid'},
	
});
Message.defaultColumns = 'title, state|20%, publishedDate|20%, contact|20%';
Message.register();
