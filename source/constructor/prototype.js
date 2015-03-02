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
