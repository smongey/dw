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


	// execute above function
	initPhotoSwipeFromDOM('.my-gallery');

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



var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements 
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            index: index,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
};
