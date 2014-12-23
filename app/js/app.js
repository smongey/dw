function l(m) {
	'use strict';
	console.log(m);
}

$(document).ready(function () {
	'use strict';

	var intro = $('#intro ul > li');
	$(intro[1]).hide();
	$(intro[2]).hide();

	$.localScroll({
		duration: 600,
		offset: 5,
		easing: 'easeOutQuart'
	});

	$('.slides').slick({
		//setting-name: setting-value
		arrows: false
	});

	$('.slides').on('mouseenter', function () {
		$(this).css({
			'margin-left': '-10px'
		});
	});

	// check if its a touch device then add class to the prints so prices and 'add to cart' button are visible
	if ($('html').hasClass('touch')) {

		$('.print').addClass('touch');
		//console.log('touchy');
		$('<a href="#" style="position:fixed; z-index:10; top:20px; right: 20px; color:#333;" class="snipcart-checkout">Cart</a>').appendTo('#about');
	}

	if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		$('.slidenav').hide();
	}

});


$(window).load(function () {
	'use strict';

	var headerImages = ['./images/header1.jpg', './images/header2.jpg', './images/header3.jpg', './images/header4.jpg', './images/header5.jpg', './images/header6.jpg', './images/header7.jpg', './images/header8.jpg'];
	var randomer = Math.floor((Math.random() * headerImages.length) + 1);
	var imageAddress = 'url(' + headerImages[randomer] + ')';

	$('#intro').css({
		'background-image' : imageAddress
	});

	var sH = $('.slides').outerHeight(),
		sW = $('.slides').outerWidth();

	l(sW + ' x ' + sH);


	$('.slidenav').css({
		'width' : sW,
		'height' : sH,
		'margin-top' : -(sH + 30)
	});

	


	if ($('.snipcart-total-items').text() == '0' || $('.snipcart-total-items').text() == '') {
		l('Cart: Empty');
		l($('.snipcart-total-items').text());
		$('.snipcart-total-items').removeClass('visible');
	} else {
		l('Cart: Full');
		l($('.snipcart-total-items').text());
		$('.snipcart-total-items').addClass('visible');
	}

	setTimeout(function () {
		$('#load').addClass('hide');
		$('body').animate({
			'margin-top' : '0'
		}, 600, 'easeOutQuart');
	}, 1000);

});


$('.add').on('click', function (e) {
	'use strict';

	if (!$(this).hasClass('soldout')) {

		$(this).empty().append('Adding...');
		$(this).delay(1000).promise().done(function () {
			$(this).empty().append('Added');
		});

		setTimeout(function () {
			$('.add').empty().append('Add to cart');
		}, 3000);

	}

});

Snipcart.execute('bind', 'item.added', function (item) {
	'use strict';
	//l(item);
	if (item) {
		//l('full');
		$('.snipcart-total-items').addClass('visible');
	} else {
		//l('empty');
		$('.snipcart-total-items').removeClass('visible');
	}

});


Snipcart.execute('bind', 'cart.closed', function () {
	'use strict';
	l('cart closed');
	if ($('.snipcart-total-items').text() == '0' || $('.snipcart-total-items').text() == '') {
		// l('empty');
		$('.snipcart-total-items').removeClass('visible');
	} else {
		// l('moneh');
		$('.snipcart-total-items').addClass('visible');
	}
});




$('a.shop').on('click', function (e) {
	'use strict';
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

$(window).on('scroll', function (e) {
	'use strict';
	if (!$('html').hasClass('touch')) {

		var sP = e.currentTarget.pageYOffset;
		
		if (sP >= headHeight) {
			$('.left').addClass('fixed');
			$('.logo').addClass('inview');
		} else {
			$('.left').removeClass('fixed');
			$('.logo').removeClass('inview');
		}

	}
});

$('.slidenav').on({
	mousemove: function (e) {
		'use strict';


		
		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {

			$('.cursor').css({
				'display' : 'none'
			});
			console.log('firefox');

		} else {
			
			console.log('NOT firefox');

			var x = e.offsetX;
    	    var y = e.offsetY;


			$('.cursor').css({
				'left' : x,
				'top' : y
			});
		}

		var halfWidth = Math.floor($(this).width() / 2);
		var halfHeight = Math.floor($(this).height() / 2);

		// l('What ' + x);

		if (x > halfWidth) {

			if (y > halfHeight) {
				//l('bottom right');
				$('.cursor').css({
					'-moz-transform' : 'rotate(180deg)',
					'transform' : 'rotate(180deg)'
				});
			} else {
				//l('top right');
				$('.cursor').css({
					'-moz-transform' : 'rotate(180deg)',
					'transform' : 'rotate(180deg)'
				});
			}
		
		} else {

			if (y > halfHeight) {
				//l('bottom left');
				$('.cursor').css({
					'-moz-transform' : 'rotate(360deg)',
					'transform' : 'rotate(360deg)'
				});
			} else {
				//l('top left');
				$('.cursor').css({
					'-moz-transform' : 'rotate(0deg)',
					'transform' : 'rotate(0deg)'
				});
			}

		}

	},
	click: function (e) {
		'use strict';

		var x = (e.offsetX || e.clientX - $(e.target).offset().left);
        var y = (e.offsetY || e.clientY - $(e.target).offset().top);

		var halfWidth = Math.floor($(this).width() / 2);
		l(e.offsetX);
		
		//if cursor is in the left half run prev slide otherwise run next click
		
		if (x > halfWidth) {
			$('.slides').slickNext();
		} else {
			$('.slides').slickPrev();
		}
	},
	mouseenter: function () {
		'use strict';
		var ball = '<div class="cursor"></div>';
		$('.slidenav').append(ball);
		//l('entered');
	},
	mouseleave: function () {
		'use strict';
		$('.cursor').remove();
	}
});


$('.credit a').on({
	mousemove: function () {
		'use strict';
		$(this).css({
			'cursor': 'url(../images/thumby.png) 10 10, auto'
		});
	}
});