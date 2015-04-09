module.exports = function(){

    var $args = arguments[0] || {},
        instances = [];

    if(typeof jQuery.fn.owlCarousel !== "function") {
        alert("simpleOwl: owl.carousel.js couldn't be found. Please include 'owl.carousel.js'.")
        return;
    }

    $.each(this, function(idx, elm) {
        var obj = {
            container: $(elm),
            settings: {
                itemSelector: '.item',
                dataSelectors: {
                    carousel: 'data-carousel',
                    loop: 'data-carousel-loop',
                    refreshRate: 'data-carousel-refresh-rate',
                    center: 'data-carousel-center',
                    forContainer: 'data-carousel-container',

                    next: 'data-carousel-next',
                    prev: 'data-carousel-previous',
                    dots: 'data-carousel-dots',

                    autoPlay: 'data-carousel-autoplay',
                    autoPlayPauseOnHover: 'data-carousel-autoplay-pause-hover',

                    startPosition: 'data-carousel-startposition',
                    slideBy: 'data-carousel-slideby',

                    video: 'data-carousel-video'
                },
                defaults: {}
            }
        };

        instances.push(new $.simpleOwl($.extend(obj, $args)));
    });

    $.each(instances, function(idx, elm) {
        elm[0].events._attach.call(elm[0], elm[1]);
    });

    return instances;

};
