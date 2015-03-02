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
                    carousel: 'data-carousel'
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

},{}],2:[function(require,module,exports){
module.exports = function($args){
    $.extend(this, $args);

    console.log(this);
 };

},{}],3:[function(require,module,exports){
var $ = window.jQuery;

$.simpleOwl = require("./constructor/prototype.js");

$.simpleOwl.prototype = {
    instances: {},

    constructor: $.simpleOwl
};

$.fn.simpleOwl = require("./constructor/jquery.js");

$(document).ready(function() {
    $.each($("[data-carousel]"), function(key, elm) {
        $(elm).simpleOwl();
    });
});

},{"./constructor/jquery.js":1,"./constructor/prototype.js":2}]},{},[3])(3)
});