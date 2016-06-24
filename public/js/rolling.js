$(document).ready(function() {
	var maxHeight = window.innerWidth / 2 * 1;
	$('#mobileheader').css({"height":maxHeight,width:"100%"});
	$('.swiper-container').css("height", maxHeight);

	var bodyheight = window.innerHeight - $("#mobileheader").height() - $("#mobilefooter").height() - 10;	
	$('#mobilebody').css("height","100%");

	var iconheight = bodyheight / 10 * 3;
	

	var marginwidth = ($('.mobile-main-div').width() - $('.mobile-main-div-img').width())/2;

	var ratio = 8/10;
	var iconwidth = ratio * iconheight;

	$('.mobile-main-div-img').css({"margin-top":marginwidth,"margin-bottom":marginwidth,"height":iconheight,"width":iconwidth});
	

	//alert(window.innerHeight);
	//alert(bodyheight+"|"+$("#mobileheader").height()+"|"+$("#mobilefooter").height());

	//初始化滚动照片
	var mySwiper =  new Swiper('.swiper-container',{
		//Your options here:
		mode: 'horizontal',
		loop: true,
		speed: 600,
		autoplay: 5000,
		autoResize: true,
		pagination: '.my-pagination',
		paginationClickable: true,
		createPagination: true,
	});
	mySwiper.startAutoplay();
});