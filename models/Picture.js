var keystone = require('keystone'),
	Types = keystone.Field.Types;
var picture = new keystone.List('Picture', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	singular: '广告管理',
	plural: '广告管理'
});
picture.add({
	title: { type: String, required: true, default: '标题' ,label: '标题'},
	property: { type: Types.Relationship, ref: 'User', index: true ,label: '物业'},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return item.property+"/"+item.state+".jpg";
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	state: { type: Types.Select, options: 'set1,set2,set3,set4,set5', default: 'set1',emptyOption: false, index: true, label:'广告位置' },
	publishedDate: { type: Types.Date, index: true, format: 'YYYY-MM-DD',label: '发布日期' },
});
picture.defaultColumns = 'title';
picture.register();
