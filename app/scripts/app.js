$(document).ready(function(){
	
	var intro = $('#intro ul > li');
	console.log();
	$(intro[1]).hide();
	$(intro[2]).hide();

	var headerImages = ['/images/header1.jpg', '/images/header2.jpg', '/images/header3.jpg', '/images/header4.jpg', '/images/header5.jpg', '/images/header6.jpg', '/images/header7.jpg', '/images/header8.jpg']
	var randomer = Math.floor((Math.random() * headerImages.length) + 1);
	var imageAddress = 'url(' + headerImages[randomer] + ')'

	$('#intro').css({
		'background-image' : imageAddress
	});


	$.localScroll({
		duration: 600,
		offset: 5,
		easing: 'easeOutQuart'
	});

	$('.slides').slick({
		//setting-name: setting-value
		arrows: false
	});



	$('.slides').on('mouseenter', function(){
		$(this).css({
			'margin-left':'-10px'
		});
	});

	$('#intro').css('background-image', headerImages[0])


	// check if its a touch device then add class to the prints so prices and 'add to cart' button are visible
	if($('html').hasClass('touch')) {

		$('.print').addClass('touch');
		console.log('touchy');
	}

});


$(window).load(function(){

	var sH = $('.slides').outerHeight(),
		sW = $('.slides').outerWidth();

	l(sW + ' x ' + sH);


	$('.slidenav').css({
		'width' : sW,
		'height' : sH,
		'margin-top' : -(sH + 30)
	});


	if($('.snipcart-total-items').text() == '0') {
		l('Cart: Empty');
		$('.snipcart-total-items').removeClass('visible');
	} else {
		l('Cart: Full');
		$('.snipcart-total-items').addClass('visible');
	}

	setTimeout(function(){
		$('#load').addClass('hide');
		$('body').animate({
			'margin-top' : '0'
		}, 600, 'easeOutQuart');
	}, 1000);

});


$('.add').on('click', function(e){

	$(this).empty().append('Adding...');
	$(this).delay(1000).promise().done(function(){
		$(this).empty().append('Added');
	});

	setTimeout(function(){
		$('.add').empty().append('Add to cart');
	}, 3000)

});

Snipcart.execute('bind', 'item.added', function(item){

	//l(item);
	if(item) {
		//l('full');
		$('.snipcart-total-items').addClass('visible');
	} else {
		//l('empty');
		$('.snipcart-total-items').removeClass('visible');
	}

});


Snipcart.execute('bind', 'cart.closed', function() {
	l('cart closed');
	if($('.snipcart-total-items').text() == '0') {
		// l('empty');
		$('.snipcart-total-items').removeClass('visible');
	} else {
		// l('moneh');
		$('.snipcart-total-items').addClass('visible');
	}
});




$('a.shop').on('click', function(e){
	e.preventDefault();
	if ($('ul.sub').hasClass('hidden')) {

		$('ul.sub').removeClass('hidden');
		$('ul.sub').show(); 

	} else {

		$('ul.sub').addClass('hidden');
		$('ul.sub').hide(); 

	}
});



var headHeight = $('#intro').height();

$(window).on('scroll', function(e){
	if(!$('html').hasClass('touch')) {

		var sP = e.currentTarget.pageYOffset;
		//console.log(headHeight);
		if(sP >= headHeight) {
			$('.left').addClass('fixed');
			$('.logo').addClass('inview');
		} else {
			$('.left').removeClass('fixed');
			$('.logo').removeClass('inview');
		}

	}
});

$('.slidenav').on({
	mousemove: function(e){
		$('.cursor').css({
			'left' : e.offsetX,
			'top' : e.offsetY
		});
		var halfWidth = Math.floor($(this).width() / 2);
		var halfHeight = Math.floor($(this).height() / 2);

		if (e.offsetX > halfWidth) {

			if (e.offsetY > halfHeight) {
				//l('bottom right');
				$('.cursor').css({
					'transform' : 'rotate(180deg)'
				});
			} else {
				//l('top right');
				$('.cursor').css({
					'transform' : 'rotate(180deg)'
				});
			}
		
		} else {

			if (e.offsetY > halfHeight) {
				//l('bottom left');
				$('.cursor').css({
					'transform' : 'rotate(360deg)'
				});
			} else {
				//l('top left');
				$('.cursor').css({
					'transform' : 'rotate(0deg)'
				});
			}

		}

	},
	click: function(e){
		var halfWidth = Math.floor($(this).width() / 2);
		l(e.offsetX);
		
		//if cursor is in the left half run prev slide otherwise run next click
		
		if (e.offsetX > halfWidth)  {
			$('.slides').slickNext();
		} else {
			$('.slides').slickPrev();
		}
	},
	mouseenter: function(){
		var ball = '<div class="cursor"></div>';
		$('.slidenav').append(ball);
		//l('entered');
	},
	mouseleave: function(){
		$('.cursor').remove();
	}
});


$('.credit a').on({
	mousemove: function(){
		$(this).css({
			'cursor': 'url(../images/thumby.png) 10 10, auto'
		});
	}
});



function l(m) {
	console.log(m)
}