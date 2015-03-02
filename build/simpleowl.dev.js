(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.simpleOwl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d:\\Web\\simpleowl\\source\\constructor\\jquery.js":[function(require,module,exports){
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

},{}],"d:\\Web\\simpleowl\\source\\constructor\\prototype.js":[function(require,module,exports){
module.exports = function($args){
    var self = this;

    $.extend(this, $args);

    this.guid = this.container.attr("id") || new Date().getTime();

    this.container.owlCarousel({
        center: (this.container.attr(this.settings.dataSelectors.center) !== null && this.container.attr(this.settings.dataSelectors.center) !== undefined) || false,
        loop: (this.container.attr(this.settings.dataSelectors.loop) !== null && this.container.attr(this.settings.dataSelectors.loop) !== undefined) || false,
        margin: (parseFloat(this.container.find('.item').css('margin')) * 2) || 0,
        nav: true, //Always on, hide it with CSS media queries
        responsiveRefreshRate: this.container.attr(this.settings.dataSelectors.refreshRate) || 100,
        responsive:{
            0: {
                items: 1
            }
        }
    });

    this.instances[this.guid] = this.container.data("owlCarousel");
    this.utils.getMediaQueries.call(this, '.item');

    this.container.on('resize.owl.carousel', function(event) {
        self.utils.getMediaQueries.call(self, '.item');
    });

};

},{}],"d:\\Web\\simpleowl\\source\\simpleowl.amd.js":[function(require,module,exports){
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

},{"./constructor/jquery.js":"d:\\Web\\simpleowl\\source\\constructor\\jquery.js","./constructor/prototype.js":"d:\\Web\\simpleowl\\source\\constructor\\prototype.js"}]},{},["d:\\Web\\simpleowl\\source\\simpleowl.amd.js"])("d:\\Web\\simpleowl\\source\\simpleowl.amd.js")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcd2F0Y2hpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwic291cmNlL2NvbnN0cnVjdG9yL2pxdWVyeS5qcyIsInNvdXJjZS9jb25zdHJ1Y3Rvci9wcm90b3R5cGUuanMiLCJzb3VyY2Uvc2ltcGxlb3dsLmFtZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xuXG4gICAgdmFyICRhcmdzID0gYXJndW1lbnRzWzBdIHx8IHt9LFxuICAgICAgICBpbnN0YW5jZXMgPSBbXTtcblxuICAgIGlmKHR5cGVvZiBqUXVlcnkuZm4ub3dsQ2Fyb3VzZWwgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBhbGVydChcInNpbXBsZU93bDogb3dsLmNhcm91c2VsLmpzIGNvdWxkbid0IGJlIGZvdW5kLiBQbGVhc2UgaW5jbHVkZSAnb3dsLmNhcm91c2VsLmpzJy5cIilcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICQuZWFjaCh0aGlzLCBmdW5jdGlvbihpZHgsIGVsbSkge1xuICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgY29udGFpbmVyOiAkKGVsbSksXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5pdGVtJyxcbiAgICAgICAgICAgICAgICBkYXRhU2VsZWN0b3JzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcm91c2VsOiAnZGF0YS1jYXJvdXNlbCcsXG4gICAgICAgICAgICAgICAgICAgIGxvb3A6ICdkYXRhLWNhcm91c2VsLWxvb3AnLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoUmF0ZTogJ2RhdGEtY2Fyb3VzZWwtcmVmcmVzaC1yYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgY2VudGVyOiAnZGF0YS1jYXJvdXNlbC1jZW50ZXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0czoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpbnN0YW5jZXMucHVzaChuZXcgJC5zaW1wbGVPd2woJC5leHRlbmQob2JqLCAkYXJncykpKTtcbiAgICB9KTtcblxuICAgICQuZWFjaChpbnN0YW5jZXMsIGZ1bmN0aW9uKGlkeCwgZWxtKSB7XG4gICAgICAgIC8vIGVsbS5zb3J0ZXIuX2NyZWF0ZUJ1dHRvbnMuY2FsbChlbG1cbiAgICB9KTtcblxuICAgIHJldHVybiBpbnN0YW5jZXM7XG5cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRhcmdzKXtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAkLmV4dGVuZCh0aGlzLCAkYXJncyk7XG5cbiAgICB0aGlzLmd1aWQgPSB0aGlzLmNvbnRhaW5lci5hdHRyKFwiaWRcIikgfHwgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5vd2xDYXJvdXNlbCh7XG4gICAgICAgIGNlbnRlcjogKHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmNlbnRlcikgIT09IG51bGwgJiYgdGhpcy5jb250YWluZXIuYXR0cih0aGlzLnNldHRpbmdzLmRhdGFTZWxlY3RvcnMuY2VudGVyKSAhPT0gdW5kZWZpbmVkKSB8fCBmYWxzZSxcbiAgICAgICAgbG9vcDogKHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmxvb3ApICE9PSBudWxsICYmIHRoaXMuY29udGFpbmVyLmF0dHIodGhpcy5zZXR0aW5ncy5kYXRhU2VsZWN0b3JzLmxvb3ApICE9PSB1bmRlZmluZWQpIHx8IGZhbHNlLFxuICAgICAgICBtYXJnaW46IChwYXJzZUZsb2F0KHRoaXMuY29udGFpbmVyLmZpbmQoJy5pdGVtJykuY3NzKCdtYXJnaW4nKSkgKiAyKSB8fCAwLFxuICAgICAgICBuYXY6IHRydWUsIC8vQWx3YXlzIG9uLCBoaWRlIGl0IHdpdGggQ1NTIG1lZGlhIHF1ZXJpZXNcbiAgICAgICAgcmVzcG9uc2l2ZVJlZnJlc2hSYXRlOiB0aGlzLmNvbnRhaW5lci5hdHRyKHRoaXMuc2V0dGluZ3MuZGF0YVNlbGVjdG9ycy5yZWZyZXNoUmF0ZSkgfHwgMTAwLFxuICAgICAgICByZXNwb25zaXZlOntcbiAgICAgICAgICAgIDA6IHtcbiAgICAgICAgICAgICAgICBpdGVtczogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmluc3RhbmNlc1t0aGlzLmd1aWRdID0gdGhpcy5jb250YWluZXIuZGF0YShcIm93bENhcm91c2VsXCIpO1xuICAgIHRoaXMudXRpbHMuZ2V0TWVkaWFRdWVyaWVzLmNhbGwodGhpcywgJy5pdGVtJyk7XG5cbiAgICB0aGlzLmNvbnRhaW5lci5vbigncmVzaXplLm93bC5jYXJvdXNlbCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHNlbGYudXRpbHMuZ2V0TWVkaWFRdWVyaWVzLmNhbGwoc2VsZiwgJy5pdGVtJyk7XG4gICAgfSk7XG5cbn07XG4iLCJ2YXIgJCA9IHdpbmRvdy5qUXVlcnk7XHJcblxyXG4kLnNpbXBsZU93bCA9IHJlcXVpcmUoXCIuL2NvbnN0cnVjdG9yL3Byb3RvdHlwZS5qc1wiKTtcclxuXHJcbiQuc2ltcGxlT3dsLnByb3RvdHlwZSA9IHtcclxuICAgIGluc3RhbmNlczoge30sXHJcblxyXG4gICAgY29uc3RydWN0b3I6ICQuc2ltcGxlT3dsLFxyXG5cclxuICAgIHV0aWxzOiB7XHJcbiAgICAgICAgZ2V0TWVkaWFRdWVyaWVzOiBmdW5jdGlvbihzZWxlY3Rvcikge1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtb3ZlIGFwcGxpZWQgc3R5bGVzIHRvIGdldCB0aGUgY3VycmVudCByZXNwb25zaXZlIHdpZHRoXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmZpbmQoJy5pdGVtJykuYXR0cignc3R5bGUnLCAnJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgcGVyY2VudGFnZSBiYXNlZCBvbiBwYXJlbnQgd2lkdGggKG5vIHBlcmNlbnRhZ2UhKVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1XaWR0aCA9IE1hdGgucm91bmQoMTAwICogcGFyc2VGbG9hdCgkKHNlbGVjdG9yKS5jc3MoJ3dpZHRoJykpIC8gcGFyc2VGbG9hdCgkKHNlbGVjdG9yKS5wYXJlbnQoKS5jc3MoJ3dpZHRoJykpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhvdyBtYW55IGl0ZW1zIGZpdHMgd2l0aGluIDEwMCVcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IDEwMCAvIHRoaXMuaXRlbVdpZHRoO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwbHkgMTAwJSB0byB0aGUgaXRlbSBjbGFzcyAoT3dsIHdpbGwgY2xvbmUgdGhpcyBhbmQgc2V0IGFuIGFic29sdXRlIHdpZHRoKVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5maW5kKCcuaXRlbScpLmNzcygnd2lkdGgnLCBcIjEwMCVcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuaXRlbVdpZHRoLCB0aGlzLml0ZW1zLCAkKHNlbGVjdG9yKS5jc3MoJ3dpZHRoJyksICQoc2VsZWN0b3IpLnBhcmVudCgpLCAkKHNlbGVjdG9yKS5wYXJlbnQoKS5jc3MoJ3dpZHRoJykpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwbHkgY2FsY3VsYXRpb25zIHRvIG93bENhcm91c2VsXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW3RoaXMuZ3VpZF0ub3B0aW9ucy5yZXNwb25zaXZlWzBdLml0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbdGhpcy5ndWlkXS5yZWZyZXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuJC5mbi5zaW1wbGVPd2wgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3Rvci9qcXVlcnkuanNcIik7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICQuZWFjaCgkKFwiW2RhdGEtY2Fyb3VzZWxdXCIpLCBmdW5jdGlvbihrZXksIGVsbSkge1xyXG4gICAgICAgICQoZWxtKS5zaW1wbGVPd2woKTtcclxuICAgIH0pO1xyXG59KTtcclxuIl19
