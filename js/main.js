var $menu = $('.menu');
var $wrap = $('#wrapper');

if($(document).width() > 992)  {

	/*  Затемнение  */
	$(function() {
		$menu.mouseenter(function(){
			$wrap.show();
		})
		$menu.mouseleave(function(){
			$wrap.hide();
		})
	});
	/*   Скролл  */
	$(function() {
		var header = $(".lower_header");
		var offset = $(header).offset().top;
		var main = $('#main');

		$(window).scroll(function (){
			var windowScroll = $(window).scrollTop()

			if (windowScroll > offset) {
				$(header).addClass("fix");
				main.css('margin-top', '77px');
			} else {
				$(header).removeClass("fix");
				$('#main').css('margin-top', '0');
			}
		});
	});
} 

else {
	/*  акордион  */
	var li = $('.menu > ul li');
	var drop = $('.menu_drop');
	li.click(function(){
			$(this).find(drop).toggle();
			li.not(this).find(drop).hide();
		});
	/* Показать мобильное меню */
	var height = $('.header_nav').css('height');
	var call = $('#menu_call');
	$(function() {
		call.click(function(){
			$menu.parent().css('position','static');
			$menu.css('top', height).animate({'width' : '100%'} , 200);
			$wrap.toggle().css('z-index','6');
		});
	});
	/* Скрыть мобильное меню */
	var closeMenu = $('#hide');
	$(function() {
		$('#hide, #wrapper').click(function(){
			$menu.animate({'width' : '0'} , 200);
			$wrap.hide();
		});
	});
};



