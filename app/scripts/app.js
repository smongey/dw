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


//	$('#intro').css('background-image', headerImages[0])

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



function l(m) {
	console.log(m)
}