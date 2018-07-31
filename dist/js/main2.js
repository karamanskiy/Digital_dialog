"use strict";

$(function(){

	$(document).ready(function(){

		$("img, a").on("dragstart", function(event) { event.preventDefault(); });

		$('#select-city').styler({
			selectPlaceholder: 'Ваш город'
		});

		$(function() {
			var $preloader = $('.main-preloader');
			setTimeout(function(){
				$preloader.fadeOut(500);
			}, 2500)
		});

		var $phoneInput = $('input[type="tel"]');
			$phoneInput.mask("+7 (999) 999-99-99");

			$phoneInput.on("blur", function() {
					var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
					
					if( last.length == 3 ) {
							var move = $(this).val().substr( $(this).val().indexOf("-") - 1, 1 );
							var lastfour = move + last;
							
							var first = $(this).val().substr( 0, 9 );
							
							$(this).val( first + '-' + lastfour );
					}
			});

		$phoneInput.focus(function() {
			if ( $(this).val() == '' ) { $(this).val('+7 ('); }
		});

		$('.read-more').click(function() {
			$(this).parent().find('.rev-content').addClass('more');
			$(this).hide();
		});

		//исправление бага ArcticModal в Firefox
		$('.arcticmodal-close').click(function() {
			$('body').css({'overflow-y': 'scroll'});
		});
		$("body").click(function(){$(this).css('overflow-y','visible')});




	$('button[type=submit], input[type=submit]').on('click', function(e) {
		var tel_input = $(this).parent().parent().find('input[type=tel]');
		if(tel_input.val() == '' || tel_input.val().length < 18) {
			e.preventDefault();
			$('#modal_error').arcticmodal();
			tel_input.addClass('error-input');
		}
	});

	$('form input').focus(function() {
		if($(this).hasClass('error-input')) {
			$(this).removeClass('error-input');
		}
	});


//AJAX email send
	$('form').submit(function(event) {
		event.preventDefault();

		var id = $(this).attr('id');
		var data = $(this).serialize();

		$.ajax({
			url				: '/emailOrder.php',
			data			: data,
			type			: 'post',
			beforeSend: function(){
				$('input[type="submit"], button[type="submit"]').attr('disabled', 'disabled');
				if($('input[type="tel"]').val() == '' || $('input[type="tel"]').val().length < 15) {
					$('#error_thank').arcticmodal();
					$(this).find('input[type="tel"]').css('borderColor', '#EF4135');
				}
			},
			success		: function() {
				$('input, textarea').val('');
				$.arcticmodal('close');
				$('#modal_thank').arcticmodal();
				// $(".success").fadeIn().delay(3000).fadeOut();
			},
			error			: function(){
				$.arcticmodal('close');
				alert('Ошибка! Что-то пошло не так...');
				// $(".error").fadeIn().delay(3000).fadeOut();
			},
			complete	: function(){
				$('input[type="submit"], button[type="submit"]').removeAttr("disabled");
			}
		});
	});





	// вызов всплывающего окна
	$('.internet_baza').click(function() {$('#modal_internet_baza').arcticmodal();});
	$('.internet_prem').click(function() {$('#modal_internet_prem').arcticmodal();});
	$('.cifr_tv').click(function() {
		//запись типа формы в скрытое поле
		var $typePacket = $(this).parent().find('.title').html();
		$('#type_cifrtv').val($typePacket);
		$('#modal_cifr_tv').arcticmodal();
	});

	$('.modal_thank').click(function() {$('#modal_thank').arcticmodal();});
	$('.modal_error').click(function() {$('#modal_error').arcticmodal();});

	$('.packettv_free').click(function() {$('#modal_packettv_free').arcticmodal();});
	$('.modal_packettv_start').click(function() {$('#modal_packettv_start').arcticmodal();});
	$('.packettv_home').click(function() {$('#modal_packettv_home').arcticmodal();});
	$('.modal_packettv_max').click(function() {$('#modal_packettv_max').arcticmodal();});
	$('.modal_packettv_hd').click(function() {$('#modal_packettv_hd').arcticmodal();});
	$('.modal_packettv_amedia').click(function() {$('#modal_packettv_amedia').arcticmodal();});
	$('.modal_packettv_nastroykino').click(function() {$('#modal_packettv_nastroykino').arcticmodal();});
	$('.modal_packettv_egoist').click(function() {$('#modal_packettv_egoist').arcticmodal();});
	$('.modal_packettv_match').click(function() {$('#modal_packettv_match').arcticmodal();});
	$('.modal_packettv_ourfotball').click(function() {$('#modal_packettv_ourfotball').arcticmodal();});
	$('.modal_packettv_night').click(function() {$('#modal_packettv_night').arcticmodal();});


	if(window.innerWidth < 768) {

		var preimSlider = $('.our-preimusch__slider').bxSlider({
			controls: false,
			pager: false,
			speed: 320,
			infiniteLoop: true,
			adaptiveHeight: true,
			// nextSelector:'#our-preimusch__slider-next',
			// prevSelector:'#our-preimusch__slider-prev',
			nextText: '',
			prevText: '',
			touchEnabled: true,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1
		});
		$('#our-preimusch__slider-next').click(function() {preimSlider.goToNextSlide();});
		$('#our-preimusch__slider-prev').click(function() {preimSlider.goToPrevSlide();});

		var revsSlider = $('.reviews-section__slider').bxSlider({
			controls: false,
			pager: false,
			speed: 320,
			infiniteLoop: true,
			adaptiveHeight: true,
			// nextSelector:'#our-preimusch__slider-next',
			// prevSelector:'#our-preimusch__slider-prev',
			nextText: '',
			prevText: '',
			touchEnabled: true,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1
		});
		$('#reviews-section__slider-next').click(function() {revsSlider.goToNextSlide();});
		$('#reviews-section__slider-prev').click(function() {revsSlider.goToPrevSlide();});
	}

	var $topMenu = $('.main-header__right');
	var $overlay = $('.blur-overlay');
	$('.main-header__hamb').click(function() {
		if(!$topMenu.hasClass('active')) {
			$topMenu.addClass('active');
			$overlay.addClass('active');
		}
	});
	$('.close-menu-btn').click(function() {
		if($topMenu.hasClass('active')) {
			$topMenu.removeClass('active');
			$overlay.removeClass('active');
		}
	});

	$(window).scroll(function(){
		var bo = $(this).scrollTop();
		if ( bo > 300 ) {
			$topMenu.removeClass('active');
			$overlay.removeClass('active');
		}
	});




	//Подсветка (выделение) активного слайда
	// $('.portf-slider').bxSlider({
	// 	// mode : 'fade',
	// 	auto: true,
	// 	pause: 10000,
	// 	controls: true,
	// 	pager: false,
	// 	speed:500,
	// 	infiniteLoop: true,
	// 	nextSelector:'#nextBtn-2',
	// 	prevSelector:'#prevBtn-2',
	// 	nextText: '',
	// 	prevText: '',
	// 	touchEnabled: true,
	// 	minSlides: 1,
	// 	maxSlides: 1,
	// 	moveSlides: 1,
	// 	onSlideAfter: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
	// 		$('.active-slide').removeClass('active-slide');
	// 		$('.bxslider .item').eq(currentSlideHtmlObject + 1).addClass('active-slide')
	// 	},
	// 	onSliderLoad: function () {
	// 		$('.bxslider .item').eq(1).addClass('active-slide')
	// 	}
	// });



//==========EoF==============
	});
});