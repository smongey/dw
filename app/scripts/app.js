$(document).ready(function(){
	
	var intro = $('#intro ul > li');
	console.log();
	$(intro[1]).hide();
	$(intro[2]).hide();

	var headerImages = ['http://placehold.it/1200x500', 'http://placehold.it/1200x500/eee', 'http://placehold.it/1200x500/ccc']


	console.log(headerImages[0]);

	$.localScroll({
		duration: 600,
		offset: 5,
		easing: 'easeOutQuart'
	});

	$('.slides').slick({
		//setting-name: setting-value
		arrows: false,
        centerPadding: '10px',
	});

	$('.slides').on('mouseenter', function(){
		$(this).css({
			'margin-left':'-10px'
		});
	});

	// $('.slide-next').on('click', function(){
	// 	$('.slides').slickNext();

	// });

//	$('#intro').css('background-image', headerImages[0])


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
		'margin-top' : -sH
	});



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
	var sP = e.currentTarget.pageYOffset;
	//console.log(headHeight);
	if(sP >= headHeight) {
		$('.left').addClass('fixed');
		$('.logo').addClass('inview');
	} else {
		$('.left').removeClass('fixed');
		$('.logo').removeClass('inview');
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
		// right arrow if over left side
		// if (e.offsetX > halfWidth) {
		// 	$(this).addClass('bottom');
		// } else {
		// 	$(this).removeClass('bottom');
		// }

		if (e.offsetX > halfWidth) {

			if (e.offsetY > halfHeight) {
				l('bottom right');
				$('.cursor').css({
					'transform' : 'rotate(180deg)'
				});
			} else {
				l('top right');
				$('.cursor').css({
					'transform' : 'rotate(180deg)'
				});
			}

			// l('right');
			// $(this).addClass('bottom');
		
		} else {

			if (e.offsetY > halfHeight) {
				l('bottom left');
				$('.cursor').css({
					'transform' : 'rotate(360deg)'
				});
			} else {
				l('top left');
				$('.cursor').css({
					'transform' : 'rotate(0deg)'
				});
			}
		
			// l('left');
			// $(this).removeClass('bottom');

		}



		// if (e.offsetY > halfHeight) {
		// 	//l('bottom');
		// 	if (e.offsetX > halfWidth) {
		// 		l('bottom right');
		// 		$(this).removeClass('top');
		// 		$(this).addClass('bottom');
		// 	} else {
		// 		l('bottom left');
		// 		$(this).removeClass('top');
		// 		$(this).removeClass('bottom');
		// 	}
		// } else {
		// 	if (e.offsetX > halfWidth) {
		// 		l('top right');
		// 		$(this).removeClass('bottom');
		// 		$(this).addClass('top');
		// 	} else {
		// 		l('top left');
		// 		$(this).removeClass('bottom');
		// 		$(this).removeClass('top');
		// 	}
		// }
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
			'cursor': 'url(images/handy.png) 10 10, auto'
		});
	}
});



function l(m) {
	console.log(m)
}