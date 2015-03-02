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
                    center: 'data-carousel-center'
                },
                defaults: {}
            }
        };

        instances.push(new $.simpleOwl($.extend(obj, $args)));
    });

    $.each(instances, function(idx, elm) {
        // elm.sorter._createButtons.call(elm
    });

    return instances;

};
