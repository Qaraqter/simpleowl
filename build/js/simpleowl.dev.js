!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.simpleOwl=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
module.exports = function($args){
    var self = this;

    $.extend(this, $args);

    this.guid = this.container.attr("id") || new Date().getTime();

    this.instances[this.guid] = {
        owl : {}
    };

    // Clone a responsive reference
    this.itemResponsive = this.container.find(this.settings.itemSelector + ':first-child').clone().appendTo(this.container).addClass('item-clone').removeClass(this.settings.itemSelector.replace(".", "")).css({
        visibility: 'hidden',
        position: 'absolute',
        left: -5000,
        top: -5000
    });

    // Get dots container
    var dotsContainer = this.utils._dotsContainer.call(this);

    // Initialize owlCarousel
    this.container.owlCarousel({
        nestedItemSelector: this.settings.itemSelector.replace(".", ""),

        center: (this.container.attr(this.settings.dataSelectors.center) !== null && this.container.attr(this.settings.dataSelectors.center) !== undefined) || false,
        loop: (this.container.attr(this.settings.dataSelectors.loop) !== null && this.container.attr(this.settings.dataSelectors.loop) !== undefined) || false,
        video: (this.container.attr(this.settings.dataSelectors.video) !== null && this.container.attr(this.settings.dataSelectors.video) !== undefined) || false,

        margin: (parseFloat(this.container.find(this.settings.itemSelector).css('margin')) * 2) || 0,

        nav: false,
        dots: dotsContainer.active || false,
        dotsContainer: dotsContainer.elm || '',

        autoplay: (this.container.attr(this.settings.dataSelectors.autoPlay) !== null && this.container.attr(this.settings.dataSelectors.autoPlay) !== undefined) || false,
        autoplayTimeout: (!isNaN(this.container.attr(this.settings.dataSelectors.autoPlay))) ? this.container.attr(this.settings.dataSelectors.autoPlay) : 5000,
        autoplayHoverPause: (this.container.attr(this.settings.dataSelectors.autoPlayPauseOnHover) !== null && this.container.attr(this.settings.dataSelectors.autoPlayPauseOnHover) !== undefined) || false,

        startPosition: (!isNaN(this.container.attr(this.settings.dataSelectors.startPosition))) ? this.container.attr(this.settings.dataSelectors.startPosition) : 0,
        slideBy: (!isNaN(this.container.attr(this.settings.dataSelectors.slideBy))) ? this.container.attr(this.settings.dataSelectors.slideBy) : 1,

        responsiveRefreshRate: this.container.attr(this.settings.dataSelectors.refreshRate) || 100,
        responsive:{
            0: {
                items: 1
            }
        }
    });

    this.instances[this.guid].owl = this.container.data("owlCarousel");
    this.utils._getMediaQueries.call(this, this.settings.itemSelector);

    return [this, this.instances[this.guid]];

};

},{}],3:[function(require,module,exports){
module.exports = function(container) {
    var $self = this;

    // Recalculate layout
    this.container.on('resize.owl.carousel', function(event) {
        $self.utils._getMediaQueries.call($self, '.item');
    });

    // Set events to data-carousel-prev and data-carousel-next
    $('[' + $self.settings.dataSelectors.next + '], [' + $self.settings.dataSelectors.prev + ']').off('click').on('click', function(e) {
        var $elm = $(e.delegateTarget),
            forContainer = $elm.attr($self.settings.dataSelectors.forContainer),
            isNext = ( $elm.attr($self.settings.dataSelectors.next) !== null && $elm.attr($self.settings.dataSelectors.next) !== undefined );

        if( forContainer === null || forContainer === undefined ) {

            $.each($self.instances, function(idx, elm) {
                if(isNext) {
                    elm.owl.next();
                } else {
                    elm.owl.prev();
                }
            });

        } else {

            if(isNext) {
                container.owl.next();
            } else {
                container.owl.prev();
            }

        }

    });

};

},{}],4:[function(require,module,exports){
var $ = window.jQuery;

$.simpleOwl = require("./constructor/prototype.js");

$.simpleOwl.prototype = {
    instances: {},

    constructor: $.simpleOwl,

    utils: {
        _getMediaQueries: require("./utils/_getMediaQueries.js"),
        _dotsContainer: require("./utils/_dotsContainer.js")
    },

    events: {
        _attach: require("./events/_attach.js")
    }
};

$.fn.simpleOwl = require("./constructor/jquery.js");

$(document).ready(function() {
    $.each($("[data-carousel]"), function(key, elm) {
        $(elm).simpleOwl();
    });
});

},{"./constructor/jquery.js":1,"./constructor/prototype.js":2,"./events/_attach.js":3,"./utils/_dotsContainer.js":5,"./utils/_getMediaQueries.js":6}],5:[function(require,module,exports){
module.exports = function($args) {
    var dotsContainer = {};

    $.each( $('[' + this.settings.dataSelectors.dots + ']'), function(idx, elm) {
        dotsContainerElm = $(elm);

        if(dotsContainerElm.attr(this.settings.dataSelectors.forContainer) === this.container.attr("id")) {
            dotsContainerElm.attr('data-indentifier', this.guid);

            dotsContainer.active = true;
            dotsContainer.elm = '[data-indentifier="' + this.guid + '"]';
        }
    }.bind(this));

    return dotsContainer;
};

},{}],6:[function(require,module,exports){
/**
*/
module.exports = function(selector) {
/*
    // Remove applied styles to get the current responsive width
    this.container.find('.' + this.settings.itemSelector).attr('style', '');

    // Calculate percentage based on parent width (no percentage!)
    this.itemWidth = Math.round(100 * parseFloat($(selector).css('width')) / parseFloat($(selector).parent().css('width')));

    // How many items fits within 100%
    this.items = 100 / this.itemWidth;

    // Apply 100% to the item class (Owl will clone this and set an absolute width)
    this.container.find('.' + this.settings.itemSelector).css('width', "100%");

    // Apply calculations to owlCarousel
    this.instances[this.guid].owl.options.responsive[0].items = this.items;
    this.instances[this.guid].owl.refresh();
    */


    var item = parseFloat(this.itemResponsive.css('width')),
        container = parseFloat(this.container.css('width'));

    // Calculate percentage based on parent width (no percentage!)
    this.itemWidth = Math.round((100 * item) / container);

    // How many items fits within 100%
    this.items = Math.round(100 / this.itemWidth);

    // Apply 100% to the item class (Owl will clone this and set an absolute width)
    this.container.find(this.settings.itemSelector).css('width', "100%");

    // Apply calculations to owlCarousel
    this.instances[this.guid].owl.options.responsive[0].items = this.items;
    this.instances[this.guid].owl.refresh();

};

},{}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwic291cmNlL2pzL2NvbnN0cnVjdG9yL2pxdWVyeS5qcyIsInNvdXJjZS9qcy9jb25zdHJ1Y3Rvci9wcm90b3R5cGUuanMiLCJzb3VyY2UvanMvZXZlbnRzL19hdHRhY2guanMiLCJzb3VyY2UvanMvc2ltcGxlb3dsLmFtZC5qcyIsInNvdXJjZS9qcy91dGlscy9fZG90c0NvbnRhaW5lci5qcyIsInNvdXJjZS9qcy91dGlscy9fZ2V0TWVkaWFRdWVyaWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgICB2YXIgJGFyZ3MgPSBhcmd1bWVudHNbMF0gfHwge30sXHJcbiAgICAgICAgaW5zdGFuY2VzID0gW107XHJcblxyXG4gICAgaWYodHlwZW9mIGpRdWVyeS5mbi5vd2xDYXJvdXNlbCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgYWxlcnQoXCJzaW1wbGVPd2w6IG93bC5jYXJvdXNlbC5qcyBjb3VsZG4ndCBiZSBmb3VuZC4gUGxlYXNlIGluY2x1ZGUgJ293bC5jYXJvdXNlbC5qcycuXCIpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbihpZHgsIGVsbSkge1xyXG4gICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJChlbG0pLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nLFxyXG4gICAgICAgICAgICAgICAgZGF0YVNlbGVjdG9yczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcm91c2VsOiAnZGF0YS1jYXJvdXNlbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogJ2RhdGEtY2Fyb3VzZWwtbG9vcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmcmVzaFJhdGU6ICdkYXRhLWNhcm91c2VsLXJlZnJlc2gtcmF0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyOiAnZGF0YS1jYXJvdXNlbC1jZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvckNvbnRhaW5lcjogJ2RhdGEtY2Fyb3VzZWwtY29udGFpbmVyJyxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogJ2RhdGEtY2Fyb3VzZWwtbmV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldjogJ2RhdGEtY2Fyb3VzZWwtcHJldmlvdXMnLFxyXG4gICAgICAgICAgICAgICAgICAgIGRvdHM6ICdkYXRhLWNhcm91c2VsLWRvdHMnLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdXRvUGxheTogJ2RhdGEtY2Fyb3VzZWwtYXV0b3BsYXknLFxyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9QbGF5UGF1c2VPbkhvdmVyOiAnZGF0YS1jYXJvdXNlbC1hdXRvcGxheS1wYXVzZS1ob3ZlcicsXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb246ICdkYXRhLWNhcm91c2VsLXN0YXJ0cG9zaXRpb24nLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQnk6ICdkYXRhLWNhcm91c2VsLXNsaWRlYnknLFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2aWRlbzogJ2RhdGEtY2Fyb3VzZWwtdmlkZW8nXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdHM6IHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgJC5zaW1wbGVPd2woJC5leHRlbmQob2JqLCAkYXJncykpKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQuZWFjaChpbnN0YW5jZXMsIGZ1bmN0aW9uKGlkeCwgZWxtKSB7XHJcbiAgICAgICAgZWxtWzBdLmV2ZW50cy5fYXR0YWNoLmNhbGwoZWxtWzBdLCBlbG1bMV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGluc3RhbmNlcztcclxuXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJGFyZ3Mpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICQuZXh0ZW5kKHRoaXMsICRhcmdzKTtcclxuXHJcbiAgICB0aGlzLmd1aWQgPSB0aGlzLmNvbnRhaW5lci5hdHRyKFwiaWRcIikgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgdGhpcy5pbnN0YW5jZXNbdGhpcy5ndWlkXSA9IHtcclxuICAgICAgICBvd2wgOiB7fVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDbG9uZSBhIHJlc3BvbnNpdmUgcmVmZXJlbmNlXHJcbiAgICB0aGlzLml0ZW1SZXNwb25zaXZlID0gdGhpcy5jb250YWluZXIuZmluZCh0aGlzLnNldHRpbmdzLml0ZW1TZWxlY3RvciArICc6Zmlyc3QtY2hpbGQnKS5jbG9uZSgpLmFwcGVuZFRvKHRoaXMuY29udGFpbmVyKS5hZGRDbGFzcygnaXRlbS1jbG9uZScpLnJlbW92ZUNsYXNzKHRoaXMuc2V0dGluZ3MuaXRlbVNlbGVjdG9yLnJlcGxhY2UoXCIuXCIsIFwiXCIpKS5jc3Moe1xyXG4gICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxyXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgIGxlZnQ6IC01MDAwLFxyXG4gICAgICAgIHRvcDogLTUwMDBcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEdldCBkb3RzIGNvbnRhaW5lclxyXG4gICAgdmFyIGRvdHNDb250YWluZXIgPSB0aGlzLnV0aWxzLl9kb3RzQ29udGFpbmVyLmNhbGwodGhpcyk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBvd2xDYXJvdXNlbFxyXG4gICAgdGhpcy5jb250YWluZXIub3dsQ2Fyb3VzZWwoe1xyXG4gICAgICAgIG5lc3RlZEl0ZW1TZWxlY3RvcjogdGhpcy5zZXR0aW5ncy5pdGVtU2VsZWN0b3IucmVwbGFjZShcIi5cIiwgXCJcIiksXHJcblxyXG4gICAgICAgIGNlbnRlcjogKHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmNlbnRlcikgIT09IG51bGwgJiYgdGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuY2VudGVyKSAhPT0gdW5kZWZpbmVkKSB8fCBmYWxzZSxcclxuICAgICAgICBsb29wOiAodGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMubG9vcCkgIT09IG51bGwgJiYgdGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMubG9vcCkgIT09IHVuZGVmaW5lZCkgfHwgZmFsc2UsXHJcbiAgICAgICAgdmlkZW86ICh0aGlzLmNvbnRhaW5lci5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy52aWRlbykgIT09IG51bGwgJiYgdGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMudmlkZW8pICE9PSB1bmRlZmluZWQpIHx8IGZhbHNlLFxyXG5cclxuICAgICAgICBtYXJnaW46IChwYXJzZUZsb2F0KHRoaXMuY29udGFpbmVyLmZpbmQodGhpcy5zZXR0aW5ncy5pdGVtU2VsZWN0b3IpLmNzcygnbWFyZ2luJykpICogMikgfHwgMCxcclxuXHJcbiAgICAgICAgbmF2OiBmYWxzZSxcclxuICAgICAgICBkb3RzOiBkb3RzQ29udGFpbmVyLmFjdGl2ZSB8fCBmYWxzZSxcclxuICAgICAgICBkb3RzQ29udGFpbmVyOiBkb3RzQ29udGFpbmVyLmVsbSB8fCAnJyxcclxuXHJcbiAgICAgICAgYXV0b3BsYXk6ICh0aGlzLmNvbnRhaW5lci5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy5hdXRvUGxheSkgIT09IG51bGwgJiYgdGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuYXV0b1BsYXkpICE9PSB1bmRlZmluZWQpIHx8IGZhbHNlLFxyXG4gICAgICAgIGF1dG9wbGF5VGltZW91dDogKCFpc05hTih0aGlzLmNvbnRhaW5lci5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy5hdXRvUGxheSkpKSA/IHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmF1dG9QbGF5KSA6IDUwMDAsXHJcbiAgICAgICAgYXV0b3BsYXlIb3ZlclBhdXNlOiAodGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuYXV0b1BsYXlQYXVzZU9uSG92ZXIpICE9PSBudWxsICYmIHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmF1dG9QbGF5UGF1c2VPbkhvdmVyKSAhPT0gdW5kZWZpbmVkKSB8fCBmYWxzZSxcclxuXHJcbiAgICAgICAgc3RhcnRQb3NpdGlvbjogKCFpc05hTih0aGlzLmNvbnRhaW5lci5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy5zdGFydFBvc2l0aW9uKSkpID8gdGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuc3RhcnRQb3NpdGlvbikgOiAwLFxyXG4gICAgICAgIHNsaWRlQnk6ICghaXNOYU4odGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuc2xpZGVCeSkpKSA/IHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLnNsaWRlQnkpIDogMSxcclxuXHJcbiAgICAgICAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlOiB0aGlzLmNvbnRhaW5lci5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy5yZWZyZXNoUmF0ZSkgfHwgMTAwLFxyXG4gICAgICAgIHJlc3BvbnNpdmU6e1xyXG4gICAgICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtczogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5pbnN0YW5jZXNbdGhpcy5ndWlkXS5vd2wgPSB0aGlzLmNvbnRhaW5lci5kYXRhKFwib3dsQ2Fyb3VzZWxcIik7XHJcbiAgICB0aGlzLnV0aWxzLl9nZXRNZWRpYVF1ZXJpZXMuY2FsbCh0aGlzLCB0aGlzLnNldHRpbmdzLml0ZW1TZWxlY3Rvcik7XHJcblxyXG4gICAgcmV0dXJuIFt0aGlzLCB0aGlzLmluc3RhbmNlc1t0aGlzLmd1aWRdXTtcclxuXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcbiAgICB2YXIgJHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIFJlY2FsY3VsYXRlIGxheW91dFxyXG4gICAgdGhpcy5jb250YWluZXIub24oJ3Jlc2l6ZS5vd2wuY2Fyb3VzZWwnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICRzZWxmLnV0aWxzLl9nZXRNZWRpYVF1ZXJpZXMuY2FsbCgkc2VsZiwgJy5pdGVtJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTZXQgZXZlbnRzIHRvIGRhdGEtY2Fyb3VzZWwtcHJldiBhbmQgZGF0YS1jYXJvdXNlbC1uZXh0XHJcbiAgICAkKCdbJyArICRzZWxmLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMubmV4dCArICddLCBbJyArICRzZWxmLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMucHJldiArICddJykub2ZmKCdjbGljaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgJGVsbSA9ICQoZS5kZWxlZ2F0ZVRhcmdldCksXHJcbiAgICAgICAgICAgIGZvckNvbnRhaW5lciA9ICRlbG0uYXR0cigkc2VsZi5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmZvckNvbnRhaW5lciksXHJcbiAgICAgICAgICAgIGlzTmV4dCA9ICggJGVsbS5hdHRyKCRzZWxmLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMubmV4dCkgIT09IG51bGwgJiYgJGVsbS5hdHRyKCRzZWxmLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMubmV4dCkgIT09IHVuZGVmaW5lZCApO1xyXG5cclxuICAgICAgICBpZiggZm9yQ29udGFpbmVyID09PSBudWxsIHx8IGZvckNvbnRhaW5lciA9PT0gdW5kZWZpbmVkICkge1xyXG5cclxuICAgICAgICAgICAgJC5lYWNoKCRzZWxmLmluc3RhbmNlcywgZnVuY3Rpb24oaWR4LCBlbG0pIHtcclxuICAgICAgICAgICAgICAgIGlmKGlzTmV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsbS5vd2wubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlbG0ub3dsLnByZXYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBpZihpc05leHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5vd2wubmV4dCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLm93bC5wcmV2KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuIiwidmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG5cclxuJC5zaW1wbGVPd2wgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3Rvci9wcm90b3R5cGUuanNcIik7XHJcblxyXG4kLnNpbXBsZU93bC5wcm90b3R5cGUgPSB7XHJcbiAgICBpbnN0YW5jZXM6IHt9LFxyXG5cclxuICAgIGNvbnN0cnVjdG9yOiAkLnNpbXBsZU93bCxcclxuXHJcbiAgICB1dGlsczoge1xyXG4gICAgICAgIF9nZXRNZWRpYVF1ZXJpZXM6IHJlcXVpcmUoXCIuL3V0aWxzL19nZXRNZWRpYVF1ZXJpZXMuanNcIiksXHJcbiAgICAgICAgX2RvdHNDb250YWluZXI6IHJlcXVpcmUoXCIuL3V0aWxzL19kb3RzQ29udGFpbmVyLmpzXCIpXHJcbiAgICB9LFxyXG5cclxuICAgIGV2ZW50czoge1xyXG4gICAgICAgIF9hdHRhY2g6IHJlcXVpcmUoXCIuL2V2ZW50cy9fYXR0YWNoLmpzXCIpXHJcbiAgICB9XHJcbn07XHJcblxyXG4kLmZuLnNpbXBsZU93bCA9IHJlcXVpcmUoXCIuL2NvbnN0cnVjdG9yL2pxdWVyeS5qc1wiKTtcclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJC5lYWNoKCQoXCJbZGF0YS1jYXJvdXNlbF1cIiksIGZ1bmN0aW9uKGtleSwgZWxtKSB7XHJcbiAgICAgICAgJChlbG0pLnNpbXBsZU93bCgpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRhcmdzKSB7XHJcbiAgICB2YXIgZG90c0NvbnRhaW5lciA9IHt9O1xyXG5cclxuICAgICQuZWFjaCggJCgnWycgKyB0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuZG90cyArICddJyksIGZ1bmN0aW9uKGlkeCwgZWxtKSB7XHJcbiAgICAgICAgZG90c0NvbnRhaW5lckVsbSA9ICQoZWxtKTtcclxuXHJcbiAgICAgICAgaWYoZG90c0NvbnRhaW5lckVsbS5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy5mb3JDb250YWluZXIpID09PSB0aGlzLmNvbnRhaW5lci5hdHRyKFwiaWRcIikpIHtcclxuICAgICAgICAgICAgZG90c0NvbnRhaW5lckVsbS5hdHRyKCdkYXRhLWluZGVudGlmaWVyJywgdGhpcy5ndWlkKTtcclxuXHJcbiAgICAgICAgICAgIGRvdHNDb250YWluZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZG90c0NvbnRhaW5lci5lbG0gPSAnW2RhdGEtaW5kZW50aWZpZXI9XCInICsgdGhpcy5ndWlkICsgJ1wiXSc7XHJcbiAgICAgICAgfVxyXG4gICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICByZXR1cm4gZG90c0NvbnRhaW5lcjtcclxufTtcclxuIiwiLyoqXHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcclxuLypcclxuICAgIC8vIFJlbW92ZSBhcHBsaWVkIHN0eWxlcyB0byBnZXQgdGhlIGN1cnJlbnQgcmVzcG9uc2l2ZSB3aWR0aFxyXG4gICAgdGhpcy5jb250YWluZXIuZmluZCgnLicgKyB0aGlzLnNldHRpbmdzLml0ZW1TZWxlY3RvcikuYXR0cignc3R5bGUnLCAnJyk7XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHBlcmNlbnRhZ2UgYmFzZWQgb24gcGFyZW50IHdpZHRoIChubyBwZXJjZW50YWdlISlcclxuICAgIHRoaXMuaXRlbVdpZHRoID0gTWF0aC5yb3VuZCgxMDAgKiBwYXJzZUZsb2F0KCQoc2VsZWN0b3IpLmNzcygnd2lkdGgnKSkgLyBwYXJzZUZsb2F0KCQoc2VsZWN0b3IpLnBhcmVudCgpLmNzcygnd2lkdGgnKSkpO1xyXG5cclxuICAgIC8vIEhvdyBtYW55IGl0ZW1zIGZpdHMgd2l0aGluIDEwMCVcclxuICAgIHRoaXMuaXRlbXMgPSAxMDAgLyB0aGlzLml0ZW1XaWR0aDtcclxuXHJcbiAgICAvLyBBcHBseSAxMDAlIHRvIHRoZSBpdGVtIGNsYXNzIChPd2wgd2lsbCBjbG9uZSB0aGlzIGFuZCBzZXQgYW4gYWJzb2x1dGUgd2lkdGgpXHJcbiAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuJyArIHRoaXMuc2V0dGluZ3MuaXRlbVNlbGVjdG9yKS5jc3MoJ3dpZHRoJywgXCIxMDAlXCIpO1xyXG5cclxuICAgIC8vIEFwcGx5IGNhbGN1bGF0aW9ucyB0byBvd2xDYXJvdXNlbFxyXG4gICAgdGhpcy5pbnN0YW5jZXNbdGhpcy5ndWlkXS5vd2wub3B0aW9ucy5yZXNwb25zaXZlWzBdLml0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgIHRoaXMuaW5zdGFuY2VzW3RoaXMuZ3VpZF0ub3dsLnJlZnJlc2goKTtcclxuICAgICovXHJcblxyXG5cclxuICAgIHZhciBpdGVtID0gcGFyc2VGbG9hdCh0aGlzLml0ZW1SZXNwb25zaXZlLmNzcygnd2lkdGgnKSksXHJcbiAgICAgICAgY29udGFpbmVyID0gcGFyc2VGbG9hdCh0aGlzLmNvbnRhaW5lci5jc3MoJ3dpZHRoJykpO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlIGJhc2VkIG9uIHBhcmVudCB3aWR0aCAobm8gcGVyY2VudGFnZSEpXHJcbiAgICB0aGlzLml0ZW1XaWR0aCA9IE1hdGgucm91bmQoKDEwMCAqIGl0ZW0pIC8gY29udGFpbmVyKTtcclxuXHJcbiAgICAvLyBIb3cgbWFueSBpdGVtcyBmaXRzIHdpdGhpbiAxMDAlXHJcbiAgICB0aGlzLml0ZW1zID0gTWF0aC5yb3VuZCgxMDAgLyB0aGlzLml0ZW1XaWR0aCk7XHJcblxyXG4gICAgLy8gQXBwbHkgMTAwJSB0byB0aGUgaXRlbSBjbGFzcyAoT3dsIHdpbGwgY2xvbmUgdGhpcyBhbmQgc2V0IGFuIGFic29sdXRlIHdpZHRoKVxyXG4gICAgdGhpcy5jb250YWluZXIuZmluZCh0aGlzLnNldHRpbmdzLml0ZW1TZWxlY3RvcikuY3NzKCd3aWR0aCcsIFwiMTAwJVwiKTtcclxuXHJcbiAgICAvLyBBcHBseSBjYWxjdWxhdGlvbnMgdG8gb3dsQ2Fyb3VzZWxcclxuICAgIHRoaXMuaW5zdGFuY2VzW3RoaXMuZ3VpZF0ub3dsLm9wdGlvbnMucmVzcG9uc2l2ZVswXS5pdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICB0aGlzLmluc3RhbmNlc1t0aGlzLmd1aWRdLm93bC5yZWZyZXNoKCk7XHJcblxyXG59O1xyXG4iXX0=
