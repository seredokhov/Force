
var $menu = $('.menu');
var $wrap = $('#wrapper');

if($(document).width() > 992)  {

	/*  Затемнение  */
	$(function() {
		$menu.mouseenter(function(){
			$wrap.stop().fadeIn(200);
		})
		$menu.mouseleave(function(){
			$wrap.stop().fadeOut(200);
		})
		/*   Скролл  */
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
	$(function() {
		/*  акордион  */
		var li = $('.menu > ul > li');
		var drop = $('.menu_drop');
		li.children('a').removeAttr('href');
		li.click(function(){
				li.not(this).find(drop).hide();
				$(this).find(drop).toggle();
			});
		/* Показать мобильное меню */
		var height = $('.header_nav').css('height');
		var call = $('#menu_call');
		call.click(function(){
			$menu.parent().css('position','static');
			$menu.css('top', height).animate({'width' : '100%'} , 200);
			$wrap.fadeIn(200).css('z-index','6');
		});
	});
	/* Скрыть мобильное меню */
	var closeMenu = $('#hide');
	$(function() {
		$('#hide, #wrapper').click(function(){
			$menu.animate({'width' : '0'} , 200);
			$wrap.fadeOut(200);
		});
	});
};



$(function() {

	/*   Блок settings   */
	var li = $('#settings').find('.dropdown-menu').find('li');
	li.click(function(){
		var text =$(this).find('span').text();
		var thisBtn = $(this).parents('.open').find('button');
		thisBtn.find('span').text(text);
	})

	/*  Инициалзация тултипов Bootstrap   */
	$('[data-toggle="tooltip"]').tooltip();

	/*  Выравнивание выпадающего меню в шапке */
	var headerLink = $('.header_nav > li > a')
	headerLink.click(function(){
		var linkWidth = $(this).parent().css('width');
		var offsetLeft = (220 - parseInt(linkWidth)) / 2;
		$(this).parent().find('ul').css('left', -offsetLeft);
	});

	/*   Ресайз блоков   */
	var table = $('#table');
	var rows = $('#rows');
	var items = $('#item_block').find('article');
	rows.click(function(){	
		if(!items.hasClass("resize")) {
			$(this).addClass('active');
			table.removeClass('active');
			items.animate({opacity:0}, '200', function(){
				items.addClass('resize')
			}).animate({opacity:1}, '200', function(){
				items.removeAttr("style")
			});
		}
	})

	table.click(function(){
		if(items.hasClass("resize")) {
			$(this).addClass('active');
			rows.removeClass('active');
			items.animate({opacity:0}, '200', function(){
				items.removeClass('resize')
			}).animate({opacity:1}, '200', function(){
				items.removeAttr("style")
			});
		}
	})

	/*   Функция подсчета стоимости + вызов  */

	function total(){
		var total=0;
		$("span[data-cost]").each(function(){
			total=total+ +$(this).text();
		});
		$('#order_sum').find('span').text(total);
		return total;
	}
	total();


	/*   Удалене из карзины   */
	var close = $('.item_4').find('.close');
	close.click(function(){
		$(this).parent().fadeOut('200', function(){
			$(this).remove();
			total();
		});
	})

	/*   Сложение   */
	var calc = $('.count_calc').find('.button');
	calc.click(function(){
		var count = $(this).parent().find('.input').text();
		var cost = $(this).parent().parent().find('span').attr('data-cost');
		if($(this).hasClass('plus')) {
			if(count<20){
				count++;
			}
		}
		else {
			if(count > 1){
				count--;
			}
		}
		summa = cost * count;
		$(this).parent().find('.input').text(count);
		$(this).parent().parent().find('span').text(summa);
		total();
	});
});


$(function() { // Ждём загрузки страницы

	$(".certificate img").click(function(){	// Событие клика на маленькое изображение
	  	var img = $(this);	// Получаем изображение, на которое кликнули
		var src = img.attr('src'); // Достаем из этого изображения путь до картинки
		$("body").append("<div class='popup'>"+ //Добавляем в тело документа разметку всплывающего окна
						 "<div class='popup_bg'></div>"+ // Блок, который будет служить фоном затемненным
						 "<img src='"+src+"' class='popup_img' />"+ // Само увеличенное фото
						 "</div>"); 
		$(".popup").fadeIn(200); // Медленно выводим изображение
		$(".popup_bg").click(function(){	// Событие клика на затемненный фон	   
			$(".popup").fadeOut(200);	// Медленно убираем всплывающее окно
			setTimeout(function() {	// Выставляем таймер
			  $(".popup").remove(); // Удаляем разметку всплывающего окна
			}, 200);
		});
	});
	
});


/*   Галлерея  */
$(function() {
	var largeImg = $('.large_photo').find('img');
	var smallImg = $('.previews .preview img');
	var largePrev = $('.large_photo').find('.prev');
	var largeNext = $('.large_photo').find('.next');
	var images = [];
	var i = 0
	smallImg.each(function(){
	    images.push($(this));
	})
	
	largeNext.click(function(){
		images[i].parent().removeClass('changed');
		i++;
		if(i > images.length- 1) {
			i=0;
		}
		images[i].parent().addClass('changed');
		var src = images[i].attr('src');
		largeImg.fadeOut(100, function(){
			largeImg.attr('src', src)
		});
		largeImg.fadeIn(100);
	})
	largePrev.click(function(){
		images[i].parent().removeClass('changed');
		i--;
		if(i < 0) {
			i = images.length- 1;
		}
		images[i].parent().addClass('changed');
		var src = images[i].attr('src');
		largeImg.fadeOut(100, function(){
			largeImg.attr('src', src)
		});
		largeImg.fadeIn(100);

	})
	
	smallImg.click(function() {
		smallImg.parent().removeClass('changed');
		$(this).parent().addClass('changed');
		var src = $(this).attr('src');
		i = $(this).attr('data-num');
		largeImg.fadeOut(100, function(){
			largeImg.attr('src', src)
		});
		largeImg.fadeIn(100);
		

	});
});

