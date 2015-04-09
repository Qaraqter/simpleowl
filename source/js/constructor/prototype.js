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
