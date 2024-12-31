jQuery(document).ready(function($) {
	console.log('ready2');
	$('.calendar-button a').click(function(event) {
     // Prevent the default behavior of the link
		 event.preventDefault();

		 // Get the href value
		 var hrefValue = $(this).attr('href');

		 // Log the href value to the console (you can use it as needed)
		 console.log(hrefValue);

		$(hrefValue).toggle();
	});
	handleScroll('.fadein', 'faded');
	handleScroll('.fadeinleft', 'faded-left');
	handleScroll('.fadeinright', 'faded-right');

	$(window).scroll(function() {
		handleScroll('.fadein', 'faded');
		handleScroll('.fadeinleft', 'faded-left');
		handleScroll('.fadeinright', 'faded-right');
	});

	function handleScroll(element, className) {
		$(element).each(function() {
			var top_of_element = $(this).offset().top;
			var bottom_of_element = top_of_element + $(this).outerHeight();
			var top_of_window = $(window).scrollTop();
			var bottom_of_window = top_of_window + $(window).height();

			if (bottom_of_window > top_of_element && top_of_window < bottom_of_element) {
				$(this).addClass(className);
			} else {
				$(this).removeClass(className);
			}
		});
	}

	$('.mobile-menu__button').click(function(e) {
		console.log('clicked');
		e.preventDefault();
		$('.mobile-menu-overlay').toggleClass('overlay-active');
		$('.mobile-menu').toggleClass('menu-open');
        $('html').toggleClass('menu-open');
	});
	$('.close-button, .mobile-menu-overlay, .mobile-menu-bg-overlay').click(function(e) {
		e.preventDefault();
		$('.mobile-menu-overlay').removeClass('overlay-active');
		$('.mobile-menu').removeClass('menu-open');
        $('html').removeClass('menu-open');
	});
});
