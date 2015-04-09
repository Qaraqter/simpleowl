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