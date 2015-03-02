var $ = window.jQuery;

$.simpleOwl = require("./constructor/prototype.js");

$.simpleOwl.prototype = {
    instances: {},

    constructor: $.simpleOwl,

    utils: {
        getMediaQueries: function(selector) {

            // Remove applied styles to get the current responsive width
            this.container.find('.item').attr('style', '');

            // Calculate percentage based on parent width (no percentage!)
            this.itemWidth = Math.round(100 * parseFloat($(selector).css('width')) / parseFloat($(selector).parent().css('width')));

            // How many items fits within 100%
            this.items = 100 / this.itemWidth;

            // Apply 100% to the item class (Owl will clone this and set an absolute width)
            this.container.find('.item').css('width', "100%");
            console.log(this.itemWidth, this.items, $(selector).css('width'), $(selector).parent(), $(selector).parent().css('width'));

            // Apply calculations to owlCarousel
            this.instances[this.guid].options.responsive[0].items = this.items;
            this.instances[this.guid].refresh();
        }
    }
};

$.fn.simpleOwl = require("./constructor/jquery.js");

$(document).ready(function() {
    $.each($("[data-carousel]"), function(key, elm) {
        $(elm).simpleOwl();
    });
});
