var menu = $('.menu');
var wrap = $('.wrapper');
$(function() {
	menu.mouseenter(function(){
		wrap.show().animate({'opacity': '1'}, 100);
	})
	menu.mouseleave(function(){
		wrap.animate({'opacity': '0'}, 100).end().hide();
	})
});