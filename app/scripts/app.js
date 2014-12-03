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

	var num = sP / 10;

	// $('.logo').css({
	// 	'margin-top' : -num,
	// 	'opacity' : 1 - num/30
	// });

	// $('#intro h1').css({
	// 	'margin-bottom' : num,
	// 	'opacity' : 1 - num/30
	// });
});

$('.slidenav').on('mousemove', function(e){
	//l(e.clientX + ' ' + e.clientY);
	$('.cursor').css({
		'left' : e.offsetX,
		'top' : e.offsetY
	});
	var halfWidth = Math.floor($(this).width() / 2);

	// right arrow if over left side
	if (e.offsetX > halfWidth) {
		$(this).addClass('right');
	} else {
		$(this).removeClass('right');
	}

});

$('.slidenav').on('click', function(e){
	var halfWidth = Math.floor($(this).width() / 2);
	l(e.offsetX);
	
	//if cursor is in the left half run prev slide otherwise run next click
	
	if (e.offsetX > halfWidth)  {
		$('.slides').slickNext();
	} else {
		$('.slides').slickPrev();
	}
});



$('.slidenav').on('mouseenter', function(){
	var ball = '<div class="cursor"></div>';
	$('.slidenav').append(ball);
	//l('entered');
});

$('.slidenav').on('mouseleave', function(){
	$('.cursor').remove();
});


function l(m) {
	console.log(m)
}