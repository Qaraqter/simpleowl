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
