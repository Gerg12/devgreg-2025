"use strict";jQuery(document).ready(function(n){function e(e,t){n(e).each(function(){var e=n(this).offset().top,o=e+n(this).outerHeight(),l=n(window).scrollTop();e<l+n(window).height()&&l<o?n(this).addClass(t):n(this).removeClass(t)})}console.log("ready2"),n(".calendar-button a").click(function(e){e.preventDefault();e=n(this).attr("href");console.log(e),n(e).toggle()}),e(".fadein","faded"),e(".fadeinleft","faded-left"),e(".fadeinright","faded-right"),n(window).scroll(function(){e(".fadein","faded"),e(".fadeinleft","faded-left"),e(".fadeinright","faded-right")}),n(".mobile-menu__button").click(function(e){console.log("clicked"),e.preventDefault(),n(".mobile-menu-overlay").toggleClass("overlay-active"),n(".mobile-menu").toggleClass("menu-open"),n("html").toggleClass("menu-open")}),n(".close-button, .mobile-menu-overlay, .mobile-menu-bg-overlay").click(function(e){e.preventDefault(),n(".mobile-menu-overlay").removeClass("overlay-active"),n(".mobile-menu").removeClass("menu-open"),n("html").removeClass("menu-open")})});
//# sourceMappingURL=scripts.js.map
