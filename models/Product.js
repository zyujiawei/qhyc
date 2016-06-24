var keystone = require('keystone'),
	Types = keystone.Field.Types;
/**
 * Product Model
 * ==========
 */
var Product = new keystone.List('Product', {
	map: { name: 'product' },
	autokey: { path: 'slug', from: 'product', unique: true },
	singular: '商品名称',
	plural: '商品名称'
});
Product.add({
	product: { type: String, required: true, default:"商品名称", index: true ,label: '商品名称'},
	store: { type: Types.Relationship, ref: 'Store', index: true,label: '店铺' },
	category: { type: Types.Relationship, ref: 'Category', index: true,label: '类别'},
	price: { type: Types.Number,default:"0.00",label: '价格'},
	sales: { type: Types.Number,default:"0",label: '销量'},
	evalue: { type: Types.Textarea, wysiwyg: true, height: 150 ,label: '评价'},
	detail: { type: Types.Textarea, wysiwyg: true, height: 150 ,label: '商品介绍'},
	image: { type: Types.LocalFile ,dest: __dirname+'/../public/advert/', label: '图像',allowedTypes :['image/jpeg'],filename: function(item, name){
		return item.store+"/"+item.category+"/"+item.store+"_"+item.category+"_"+item.product+"_"+item._.publishedDate.format('YYYY-MM-DD')+"_"+name;
	} ,format: function(item, file){
		return '<img src="/advert/'+file.filename+'" style="max-width: 300px">'
	}},
	publishedDate: { type: Types.Date, index: true, label: '日期',default: Date.now},
});
Product.relationship({ ref: 'Post', path: 'store' });
Product.relationship({ ref: 'Post', path: 'category' });
Product.defaultColumns = 'product, store|20%, category|20%, price|20%, sales|20%';
Product.register();
